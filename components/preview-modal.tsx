"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "./ui/modal";
import Gallery from "./gallery";
import Info from "./info";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="flex lg:flex-row flex-col items-start gap-6 w-full">
        <div className="w-full lg:w-1/2">
          <Gallery images={product.images} />
        </div>
        <div className="w-full lg:w-1/2">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
