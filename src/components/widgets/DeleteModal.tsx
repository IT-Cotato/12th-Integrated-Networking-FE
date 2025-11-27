import Button from "../html/Button";
import { NightStorm } from "../img/NightStorm";

interface DeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ onCancel, onConfirm }: DeleteModalProps) {
  return (
    <div className="delete-card">
      <div className="title">정말로 삭제하시겠습니까?</div>

      <NightStorm className="logo" />
      <div className="button-container">
        <Button className="button-no" onClick={onCancel}>
          <div className="button-text-no">취소하기</div>
        </Button>

        <Button className="button-yes" onClick={onConfirm}>
          <div className="button-text-yes">삭제하기</div>
        </Button>
      </div>
    </div>
  );
}
