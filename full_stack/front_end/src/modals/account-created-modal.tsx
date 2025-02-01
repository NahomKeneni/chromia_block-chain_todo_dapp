import { create, useModal } from "@ebay/nice-modal-react";
import Button from "@/components/chromia-ui-kit/button";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import TadaBg from "@/components/ui/tada-bg";
import { CheckCircle } from "lucide-react"; // Import the CheckCircle icon from lucide-react

const AccountCreatedModal = create(() => {
  const modal = useModal();

  return (
    <DrawerDialog
      DialogContentProps={{ "aria-describedby": undefined }}
      footer={
        <Button variant="secondary" onClick={modal.hide}>
          Great! {/* Button text remains the same */}
        </Button>
      }
      open={modal.visible}
      title={
        <span className="grid place-items-center py-20">
          <TadaBg className="absolute" />
          {/* Use CheckCircle icon for a more professional look */}
          <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
          Thanks for creating an account!
        </span>
      }
      onOpenChange={modal.hide}
    />
  );
});

export const useAccountCreatedModal = () => {
  const modal = useModal(AccountCreatedModal);

  return modal;
};
