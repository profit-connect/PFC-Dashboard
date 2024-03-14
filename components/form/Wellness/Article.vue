<template>
  <div class="px-5"> {{ computedSelectedArticle.description_html }}
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedArticle"
    >
    <p style="font-size: 10px;">Auto-publish-date</p>
    <div class="d-flex justify-content-between">
      <FormKit
            style="height: 40px;"
            type="date"
            name="published_date"
            label="Set Date"
            validation-visibility="live"
          />
          <FormKit
             style="height: 40px; font-size: 14px;"
            :class="computedSelectedArticle && computedSelectedArticle.id ? 'article-selected' : 'article-not-selected'"
            :disabled="!computedSelectedArticle || !computedSelectedArticle.id"
            type="button"
            :label="computedSelectedArticle.published === 'Yes' ? 'Published' : 'Publish'"
            name="published"
            @click="handlePublishClick"
            validation="required"
          />




        </div>
        <div class="row my-4">
        <div class="col-5 custom-multiselect-container" >
          <FormKit
          
            type="uppy"
            label="Image or Video Link"
            name="src"
            :hideUploadButton="true"
            help="Max image upload: 960x540px, 1MB, in .jpg, .png, or .gif. Max video upload: 720p resolution, 4MB."
          />
        </div>
        <div class="col-7 custom-multiselect-container">
          <FormKit
          style="height: 100px"
          type="textarea"
          name="header"
          label="Title"
          placeholder="Title                                                                          Limit: 50 characters"
          validation="required"
        />
             <div class="row">
        <div class="col-6 custom-multiselect-container">
          <MixInputBox
            title="Category"
            style="height: 90px; padding-top: 10px"
          >
            <FormKit
              type="multiselect"
              label="Category id"
              name="category_id"
              openDirection="bottom"
              validation="required"
              :value="category?.id"
              :options="categories"
              :key="category?.id"
            />
          </MixInputBox>
        </div>
          <div class="col-6 custom-multiselect-container">
          <MixInputBox
            title="Duration"
            style="height: 90px; padding-top: 10px"
          >
          <div class="row">
            <div class="col-4">
                <!-- <FormKit
                  style="height: 40px"
                  type="number"
                  name="duration"
                  validation="required"
                /> -->
                <FormKit
                  style="height: 40px"
                  type="text"
                  name="read_time_no"
                  validation="required"
                />
              </div>
              <div class="col-8">
                <FormKit
                  type="multiselect"
                  label="Class"
                  name="read_time"
                  openDirection="bottom"
                  validation="required"
                  :options="timeTypeSelect"
                />
              </div>
          </div>
          </MixInputBox>
        </div>
      </div>
        </div>
      </div>
      <div style="width: 100%; min-height: 300px; background: var(--fk-bg-input, #c42727);
       border-radius: 10px; padding: 10px;"> 
      <div>
        <FormKit
          style="background-color: var(--fk-bg-input, #c42727); border-radius: 5px; 
          color:  #84CEFF;; width: 140px; left: 60%; position: relative; z-index: 2;
           font-size: 14px;  height: 35px; top:67px; left: 75%;"
          type="button"
          label="Add Button"
          @click="showButton=true"
          validation="required"
        />
          <FormKit
          type="richText"
          name="description_html"
          label="description_html"
           />

      </div>
      <div v-if="showButton" class="d-flex items-align-center">
        <img  src="~assets/images/svg/remove-icon.svg" 
           @click="showButton=false" 
           style="rotate: 135deg;  position: relative; left: 74.5%; bottom: 33px;" />
        <FormKit
          style="background-color: #E00000; color: white; width: 358px; left: 60%;"
          type="button"
          label="Book Now"
          validation="required"
        />
      </div>
    </div>
      
      <div class="row">
        <div class="col-6 custom-multiselect-available_tags">
          <span
            style="
              position: relative;
              bottom: -39.1px;
              left: 15px;
              z-index: 90;
              font-size: 16px;
            "
            >Available To</span
          >
          <FormKit
            type="multiselect"
            label="Available To"
            openDirection="top"
            name="available_tags"
            mode="tags"
            v-model="availableTagsSelected"
            :options="availableTags"
          />
        </div>
        <div class="col-6 custom-multiselect-except">
          <span
            style="
              position: relative;
              bottom: -39.1px;
              left: 15px;
              z-index: 90;
              font-size: 16px;
            "
            >Except</span
          >
          <FormKit
            type="multiselect"
            label="Except"
            name="except_tags"
            mode="tags"
            openDirection="top"
            :options="exceptTags"
            v-model="exceptTagsSelected"
          />
          <!-- <div class="disbale-icon">
          <img src="~/assets/images/svg/disable-icon.svg?timestamp=1706775974781" alt="Disable icon">
        </div> -->
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <FormKit type="submit">Save</FormKit>
      </div>
    </FormKit>
    <button
      class="btn"
      style="position: relative; left: 365px; margin-bottom: 20px"
      @click="$emit('close-canvas')"
    >
      Cancel
    </button>
  </div>
</template>

<script lang="ts" setup>
import { classOptions, timeTypeSelect } from "@/constants/class";
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { removeObjectKeys } from "@/utils/dataCleaner";
import { cleanObjectL1 } from "@/utils/dataCleaner";
const { $toast } = useNuxtApp();
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  category: {
    tye: Object,
    default: () => {},
  },
  articleData: {
    type: Object,
    default: () => {},
  },
});



const emit = defineEmits(["reload", "close-canvas"]);
const { currentUserType } = useAuthStore();
const availableTagsSelected = ref([]);
const exceptTagsSelected = ref([]);
const showButton = ref(false);
const { tags } = storeToRefs(useTagStore());
const isPublished = ref(false);

const handlePublishClick = () => {
 
  if (computedSelectedArticle.value?.id) {
    // Perform the API call with 'yes'
    const articleData = { ...computedSelectedArticle.value, published: 'Yes' };
    console.log(articleData)
    updateArticle(articleData);
  }
};
const exceptTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            availableTagsSelected.value &&
            !availableTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});

const computedSelectedArticle = computed(() => {
  return props.articleData
    ? {
        ...useOmit(props.articleData, ["src", "img_video"]),
        available_tags: props.articleData.available_tags
          .filter((item) => item)
          .map((item) => item.id),
        except_tags: props.articleData.except_tags
          .filter((item) => item)
          .map((item) => item.id),
      }
    : {};
});

const availableTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            exceptTagsSelected.value &&
            !exceptTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});

const addArticle = async (articleData: any) => {
  console.log("articleData",articleData)
  const { data, error, execute } = useCustomFetch<any>("/wellness/add/article", {
    method: "POST",
    body: JSON.stringify(cleanObjectL1({
      ...articleData,
      facility_id: currentUserType?.id,
    })),
    headers: {
      'Content-Type': 'application/json', // Set the content type for JSON payloads
    },
  });

  try {
    await execute(); // Execute the fetch request

    // Check the response and handle accordingly
    if (data.value && data.value.return) {
      $toast("Class added successfully!");
      emit("reload"); // Reload or refresh data
      // emit("close-canvas"); // If you have a modal or overlay to close
    } else if (data.value) {
      $toast(data.value.message); // Show error message from response
    } else if (error.value) {
      $toast("An error occurred while adding the class.");
      console.error("Error:/api/class/add", error.value); // Log the error
    }
  } catch (err) {
    console.log("Catch block error:/api/class/add", err);
    $toast("Failed to add class due to an exception.");
  }
};


const updateArticle = async (articleData: any) => {
  const { data, error, execute } = useCustomFetch<any>("/wellness/update/article", {
    method: "POST",
    body: JSON.stringify(cleanObjectL1({ // Make sure to stringify your body if your fetch wrapper doesn't automatically do it
      ...articleData,
      facility_id: currentUserType?.id,
      article_id: computedSelectedArticle.value?.id,
    })),
    headers: {
      'Content-Type': 'application/json', // Ensure you set the correct content type for JSON payloads
      // Additional headers as needed
    },
  });

  try {
    await execute(); // This is assuming useCustomFetch is a wrapper around useFetch that requires execution

    // Since useFetch from Nuxt 3 automatically unwraps the response, you might need to adjust how you access the data
    if (data.value && data.value.return) {
      emit("reload");
      $toast("Class edited successfully!");
      // emit("close-canvas");
    } else if (data.value) {
      $toast(data.value.message);
    } else if (error.value) {
      $toast("An error occurred while updating the class.");
      console.error("Error:/api/class/edit", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/class/edit", err);
    $toast("Failed to update class due to an exception.");
  }
};

const submitHandler = async (articleData) => {  
  computedSelectedArticle.value?.id
    ? updateArticle(articleData)
    : addArticle(articleData);
};


</script>

<style lang="scss" scoped>
.is-invalid {
  /* Custom styling for invalid fields */
  border-color: red;
  /* Add more styling as needed */
}
.disbale-icon {
  position: absolute;
  bottom: 340px;
  right: 100px;
}
.article-selected {
  background-color: var(--fk-bg-input, #c42727);
  width: 120px;
}

.article-not-selected {
  background-color: yellow;
  width: 120px;
}

</style>
