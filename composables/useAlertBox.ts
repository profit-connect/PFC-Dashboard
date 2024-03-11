import { IAlertBox } from "~/types/mix/alert";

export default () => {
  const { emit } = useEventBus<IAlertBox>("alert-box");
  const showAlertBox = (data: IAlertBox) => {
    emit(data);
  };

  const closeAlertBox = () => {
    emit({
      title: "",
      message: "",
      destroy: true,
    });
  };
  return {
    showAlertBox,
    closeAlertBox,
  };
};
