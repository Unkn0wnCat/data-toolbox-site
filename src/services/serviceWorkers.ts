import { useEffect, useState } from "react";


enum events {
  updateAvailable
}

type Event = {
    type: events
}

let eventListeners: Map<events, ((ev: Event) => void)[]> = new Map<events, ((ev: Event) => void)[]>();

let pendingUpdate = false;

if('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((reg) => {
    if(reg && reg.waiting) {
      pendingUpdate = true;
      let handlers = eventListeners.get(events.updateAvailable) || [];
  
      handlers.forEach((func) => {
        func({
          type: events.updateAvailable
        });
      });
    }
  })
}

const broadcast = new BroadcastChannel('sw-updates');

broadcast.addEventListener('message', (event) => {
  console.log(event);

  if(event.data && event.data.type === "UPDATE_AVAILABLE") {
    pendingUpdate = true;

    let handlers = eventListeners.get(events.updateAvailable) || [];

    handlers.forEach((func) => {
      func({
        type: events.updateAvailable
      });
    });
  }
})

const isUpdatePending = () => {
  return pendingUpdate;
}

const forceUpdate = () => {
  broadcast.postMessage({
    type: "SKIP_WAITING"
  })

  pendingUpdate = false;

  window.location.reload();
}

const on = (event: events, handler: (ev: Event) => void) => {
  let list = eventListeners.get(event) || [];

  list.push(handler);

  eventListeners.set(event, list);
}

const off = (event: events, handler: (ev: Event) => void) => {
  let list = eventListeners.get(event) || [];

  let index = list.indexOf(handler);

  if(index === -1) return;

  list.splice(index, 1);

  eventListeners.set(event, list);
}

const useUpdatePending = () => {
    const [updatePending, setUpdatePending] = useState(isUpdatePending)

    const updateAvailable = () => {
        setUpdatePending(true);
    }

    useEffect(() => {
        on(ServiceWorkerAPI.events.updateAvailable, updateAvailable);

        return () => {
            off(ServiceWorkerAPI.events.updateAvailable, updateAvailable);
        }
    })

    return updatePending
}

const serviceWorkerAvailable = () => {
  return 'serviceWorker' in navigator;
}

const checkUpdate = async (): Promise<boolean> => {
  if('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.getRegistration()
  
      if(!reg) return false;
  
      await reg.update();
    } catch(e) {
      return false;
    }
  }
  return false;
}

const useCheckUpdate = () => {
  const [checkingForUpdate, setChecking] = useState(false);

  const checkForUpdate = async () => {
    setChecking(true);

    await checkUpdate();

    setChecking(false);
  }

  return {checkingForUpdate, checkForUpdate};
}

const ServiceWorkerAPI = {
  on,
  off,
  forceUpdate,
  isUpdatePending,
  events,
  useUpdatePending,
  serviceWorkerAvailable,
  useCheckUpdate
}

export default ServiceWorkerAPI
