<template>
  <ClientOnly>
    <Dashboard
      :uppy="uppy"
      :props="dataTemp"
      :plugins="['DragDrop', 'ImageEditor']"
    />
  </ClientOnly>
</template>

<script setup>
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
// Don't forget the CSS: core and UI components + plugins you are using
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { getBase64 } from "@/utils/file";
import ImageEditor from "@uppy/image-editor";
import "@uppy/image-editor/dist/style.min.css";

const props = defineProps({
  context: Object,
});

const values = ref(props.context._value);

const dataTemp = {
  inline: true,
  height: props.context.height ?? 200,
  width: "100%",
  maxHeight: props.context.heigh ?? 200,
  hideUploadButton: props.context.hideUploadButton ?? true,
  closeAfterFinish: false,
  showProgressDetails: true,
  proudlyDisplayPoweredByUppy: false,
  showRemoveButtonAfterComplete: true,
  autoOpenFileEditor:true
};

const uppy = ref();
onMounted(() => {
  let tagetRatio = 0;
  const targetHeight = props.context.targetHeight ?? 0;
  const targetWidth = props.context.targetWidth ?? 0;
  if (targetHeight && targetWidth) {
    tagetRatio = targetWidth / targetHeight;
  }
  console.log(props.context);
  uppy.value = new Uppy({
    debug: false,
    autoProceed: false,
    restrictions: {
      maxFileSize: props.context.maxFileSize ?? 1000000,
      maxNumberOfFiles: props.context.maxNumberOfFiles ?? 1,
      minNumberOfFiles: props.context.minNumberOfFiles ?? 0,
      allowedFileTypes: props.context.allowedFileTypes ?? [
        ".png",
        ".jpg",
        ".jpeg",
      ],
    },
    locale: {
      strings: {
        dropPasteFiles:
          `${props.context.label}%{browse}` ?? "Browse files%{browse}",
      },
    },
  }).use(ImageEditor, {
    actions: {
      revert: true,
      rotate: false,
      granularRotate: false,
      flip: false,
      zoomIn: true,
      zoomOut: true,
      cropSquare: false,
      cropWidescreen: false,
      cropWidescreenVertical: false,
    },
    cropperOptions: {
      aspectRatio: tagetRatio,
      resizable: false, 
      },
  });

  const getFiles = computed(() => {
    return uppy.value.getFiles();
  });

  watch(getFiles, async (val) => {
    const base64Images = [];
    let fileSizeError = false;

    for (let i = 0; i < val.length; i++) {
      if (val[i].size > Number(props.context.maxFileSize ?? 1000000)) {
        // Set the flag to true if any file exceeds the size limit
        fileSizeError = true;
        break;
      } else {
        const image = await getBase64(val[i].data);
        base64Images.push(image.split(",")[1]);
      }
    }

    if (fileSizeError) {
      // Display a custom error message
      props.context.node.setErrors("File size should be less than 1 MB");
    } else {
      // Proceed with the normal flow if there's no error
      props.context.node.input(
        base64Images.length === 1 ? base64Images[0] : base64Images
      );
    }
  });
});
</script>

<style lang="scss">
.uppy-DashboardContent-panel {
  position: fixed;
  top: 5%;
  left: 5%;
  bottom: 5%;
  right: 5%;
  &::before {
    content: "";
    position: fixed;
    background: #002e4b;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
