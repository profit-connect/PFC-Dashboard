export default () => {
  let isActivated = ref(false);

  let activetedId = ref(null);

  const setEditId = (id) => {
    activetedId.value = id;
    isActivated.value = true;
  };

  const closeEditMode = () => {
    activetedId.value = null;
    isActivated.value = false;
  };
  return {
    isActivated,
    activetedId,
    setEditId,
    closeEditMode,
  };
};
