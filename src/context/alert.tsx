import ReactDOM from 'react-dom';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface AlertContextType {
  data: AlertData;
  show: (type: AlertShowData['type'], info: AlertInfo) => void;
  hide: () => void;
}

type AlertData = AlertShowData | AlertHideData;

type AlertShowData = {
  show: true;
  type: 'confirm' | 'log' | 'error' | 'banner';
} & AlertInfo;

type AlertHideData = { show: false; }

const defaultData = { show: false } as const;
const defaultValue = { show: () => {}, hide: () => {}, data: defaultData };
const AlertContext = createContext<AlertContextType>(defaultValue);

export const AlertContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [alert, setAlert] = useState<AlertData>(defaultData);

  const show = useCallback((type: AlertShowData['type'], info: AlertInfo) => {
    setAlert({ show: true, type, ...info });
  }, []);

  const hide = useCallback(() => {
    setAlert({ show: false });
  }, []);

  const value = useMemo(() => ({ show, hide, data: alert }), [alert, show, hide]);

  const dialogProps = useMemo(() => {
    if (!('type' in alert)) return { message: '' };
    const { title, message, okText, cancelText, onOk, onCancel, type } = alert;
    return ({
      confirm: { title, message, okText, cancelText, onOk, onCancel },
      log: { title, message, okText, onOk },
      error: { title, message, okText, onOk },
      banner: { message },
    }[type]) as AlertInfo;
  }, [alert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Dialog open={alert.show} {...dialogProps} close={hide} />
    </AlertContext.Provider>
  );
}

const Dialog = ({ title, message, cancelText, okText, onCancel, onOk, open, close }: AlertInfo & { open: boolean; close: () => void }) => {
  const onCancelClicked = () => {
    onCancel && onCancel();
    close();
  }
  
  const onOkClicked = () => {
    onOk && onOk();
    close();
  }

  if (!open) return <></>;
  return ReactDOM.createPortal((
    <dialog open>
      {title && <header>{title}</header>}
      <div>{message}</div>
      <footer>
        <button onClick={onCancelClicked}>{cancelText || '취소'}</button>
        <button onClick={onOkClicked}>{okText || '확인'}</button>
      </footer>
    </dialog>
  ), document.body);
}

interface AlertInfo {
  title?: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onOk?: () => void;
}

const useAlert = () => {
  const { show, hide } = useContext(AlertContext);

  return {
    log: (info: AlertInfo) => show('log', info),
    confirm: (info: AlertInfo) => show('confirm', info),
    error: (info: AlertInfo) => show('error', info),
    banner: (message: string) => show('banner', { message }),
    hide,
  }
}

export default useAlert;