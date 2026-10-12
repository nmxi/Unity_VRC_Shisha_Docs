import {useEffect, useRef, useState, type ComponentProps} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ClickableImage.module.css';

type ClickableImageProps = ComponentProps<'img'> & {imageClassName?: string};

// Adapted from Unity_VRC_Cigar_Docs/src/components/ClickableImage.tsx.
export default function ClickableImage({src = '', alt = '', className, imageClassName, ...props}: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSize, setExpandedSize] = useState<{width: number; height: number}>();
  const imageSrc = useBaseUrl(src);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const openImage = () => {
    const image = imageRef.current;
    if (!image) return;
    const {width, height} = image.getBoundingClientRect();
    setExpandedSize({width: width * 2.5, height: height * 2.5});
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      imageRef.current?.focus({preventScroll: true});
    };
  }, [isOpen]);

  return (
    <>
      <img
        decoding="async"
        loading="lazy"
        {...props}
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        className={clsx(styles.clickableImage, className, imageClassName)}
        role="button"
        tabIndex={0}
        aria-label={alt ? `${alt}を拡大表示` : '画像を拡大表示'}
        aria-haspopup="dialog"
        onClick={(event) => {event.preventDefault(); openImage();}}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openImage();
          }
        }}
      />
      {isOpen && createPortal(
        <dialog
          ref={dialogRef}
          className={styles.modal}
          aria-label="画像の拡大表示"
          onCancel={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent}>
            <img
              src={imageSrc}
              alt={alt}
              className={styles.modalImage}
              style={expandedSize}
              onClick={(event) => {
                // object-fit leaves clickable empty space inside the img box.
                // Only clicks on the rendered image should keep the modal open.
                const image = event.currentTarget;
                const bounds = image.getBoundingClientRect();
                const scale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
                const width = image.naturalWidth * scale;
                const height = image.naturalHeight * scale;
                const left = bounds.left + (bounds.width - width) / 2;
                const top = bounds.top + (bounds.height - height) / 2;
                if (event.clientX >= left && event.clientX <= left + width &&
                    event.clientY >= top && event.clientY <= top + height) {
                  event.stopPropagation();
                }
              }}
            />
          </div>
          <button type="button" className={styles.close} aria-label="閉じる" onClick={() => setIsOpen(false)} autoFocus>&times;</button>
        </dialog>,
        document.body,
      )}
    </>
  );
}
