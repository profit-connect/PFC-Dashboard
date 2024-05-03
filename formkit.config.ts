
import { createInput } from "@formkit/vue";
import Uppy from "@/components/formkit/Uppy.vue";
import Multiselect from "@/components/formkit/Multiselect.vue";
import Switch from "@/components/formkit/Switch.vue";
import RichTextEditor from "@/components/formkit/RichTextEditor.vue";
import TinyMCE from "@/components/formkit/TinyMCE.vue";

// When integrating tailwind add classes here
export default {
  inputs: {
    uppy: createInput(Uppy, {
      props: [
        "hideUploadButton",
        "allowedFileTypes",
        "maxNumberOfFiles",
        "maxFileSize",
        "minNumberOfFiles",
        "height",
        "targetHeight",
        "targetWidth",
      ],
    }),
    multiselect: createInput(Multiselect, {
      props: [
        "openDirection",
        "options",
        "mode",
        "placeholder",
        "searchable",
        "hideSelected",
      ],
    }),
    switch: createInput(Switch, {
      props: [],
    }),
    richText: createInput(RichTextEditor, {
      props: [],
    }),
    tiny: createInput(TinyMCE, {
      props: [],
    }),
  },
  messages: {
      en: {
        ui: {
          incomplete: "Missing field(s). Please check and ensure all fields are completed correctly.",
        },
      },
    },
};
