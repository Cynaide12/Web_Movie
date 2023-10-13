import react, { useState, useEffect, useRef } from "react";
import cs from './ResponsiveModal.module.css'
import { useResponseContext } from "../../../context/responseContext";

const ResponsiveModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { response } = useResponseContext()
  const elem = useRef(0)
  const isMounted = useRef(true);

  useEffect(() => {
    elem.current.offsetRight = 300
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (response) {
      setIsOpen(true);
      setTimeout(() => {
        if (isMounted.current) {
          setIsOpen(false);
        }
      }, 3000);
    }
  }, [response]);

  return (
    <div className={[cs.modalContainer]}>
      <div className={[cs.modalWrapper, isOpen ? cs.modalWrapper_open : ''].join(' ')} ref={elem}>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ResponsiveModal;
