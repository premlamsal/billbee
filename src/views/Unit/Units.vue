<template>
  <main id="units-page">
    <h1>Units</h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showUnitModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayUnitModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addUnit()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Unit</h1>
          </div>
          <div class="modal-body">
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Unit Short Name</label>
                <input
                  type="text"
                  placeholder="Unit Short Name"
                  class="unitShortNameHolder"
                  :class="[
                    'form-input-holder',
                    errors.short_name ? 'is-invalid' : '',
                  ]"
                  v-model="unit.short_name"
                />
                <div v-if="errors.short_name" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.short_name"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label> Long Name</label>

                <input
                  type="text"
                  placeholder="Unit Long Name"
                  :class="[
                    'form-input-holder',
                    errors.long_name ? 'is-invalid' : '',
                  ]"
                  v-model="unit.long_name"
                />
                <div v-if="errors.long_name" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.long_name"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="unit-header">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchUnit()">
            <span class="material-icons">search</span>
          </div>
          <input
            type="text"
            class="searchInputTable"
            placeholder="Search.."
            v-model="searchQuery"
          />
        </div>
      </div>
      <div class="button-box">
        <button class="btn-new-unit" @click="addUnitBtn()">
          <span class="btn-name"> New Unit</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="units-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="units.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Unit ID</th>
              <th>Short Name</th>
              <th>Long Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="unit in units" v-bind:key="unit.id">
              <tr v-if="units != null">
                <td>{{ unit.custom_unit_id }}</td>
                <td>{{ unit.short_name }}</td>
                <td>{{ unit.long_name }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editUnitModal(unit.id)"
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
                    @click="deleteUnitModal(unit.id)"
                    >delete</span
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination-container" v-if="units.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getUnits(pagination.first_link)"
                class="page-link"
              >
                <span class="material-icons">first_page</span>
                First
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.prev_link }"
              v-if="pagination.prev_link"
            >
              <button @click="getUnits(pagination.prev_link)" class="page-link">
                <span class="material-icons">chevron_left</span>

                Prev
              </button>
            </li>
            <li
              v-for="n in pagination.last_page"
              v-bind:key="n"
              class="page-item"
              v-bind:class="{ active: pagination.current_page == n }"
            >
              <button
                @click="getUnits(pagination.path_page + n)"
                class="page-link"
              >
                {{ n }}
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.next_link }"
              v-if="pagination.next_link"
            >
              <button @click="getUnits(pagination.next_link)" class="page-link">
                <span class="material-icons">chevron_right</span>

                Next
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.last_link }"
            >
              <button @click="getUnits(pagination.last_link)" class="page-link">
                <span class="material-icons">last_page</span>

                Last
              </button>
            </li>
          </ul>
        </div>
        <div class="pagination-footer">
          Page: {{ pagination.current_page }}-{{ pagination.last_page }} Total
          Records: {{ pagination.total_pages }}
        </div>
      </div>
    </div>
  </main>
  <prompt
    :is-prompt="isActivePrompt"
    @event-confirm="callbackPrompt"
    @event-cancel="callbackPromptCancel"
  ></prompt>
</template>
    <script>
import { computed, reactive, ref, inject, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const units = reactive([]);
    const errors = ref({});

    const showUnitModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const unit = reactive({});
    const modalHeader = ref(""); // Add or Edit Unit

    //on mounted start
    onMounted(() => {
      getUnits();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteUnitModal = (unit_id) => {
      isActivePrompt.value = true;
      delete_id.value = unit_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteUnit(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteUnit = (unit_id) => {
      axios
        .delete("unit/" + unit_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getUnits();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const addUnitBtn = () => {
      clearUnit();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayUnitModal();
      // router.push({ path: '/new-unit' })
    };
    const editUnitModal = (unit_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayUnitModal();
      getSingleUnit(unit_id);
    };
    const getSingleUnit = (unit_id) => {
      console.log(unit_id);

      axios
        .get("unit/" + unit_id)
        .then((response) => {
          // console.log(response.data.unit.short_name);
          unit.id = response.data.unit.id;
          unit.short_name = response.data.unit.short_name;
          unit.long_name = response.data.unit.long_name;

          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const displayUnitModal = () => {
      clearUnit();
      if (showUnitModal.value) {
        showUnitModal.value = false;
      } else {
        showUnitModal.value = true;
      }
    };
    const clearUnit = () => {
      unit.short_name = "";
      unit.long_name = "";
      errors.value = "";
    };
    const addUnit = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", unit.id);
        formdata.append("short_name", unit.short_name);
        formdata.append("long_name", unit.long_name);
        axios
          .post("unit/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear unit form
            clearUnit();
            //get new data from api units
            getUnits();
            //hide the unit modal
            displayUnitModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("short_name", unit.short_name);
        formdata.append("long_name", unit.long_name);
        axios
          .post("unit/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear unit form
            clearUnit();
            //get new data from api units
            getUnits();
            //hide the unit modal
            displayUnitModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
    };

    const getUnits = (page_url) => {
      // toast("Unit Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "units";

      units.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            units.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const pagination = ref({});

    const makePagination = (meta, links) => {
      let pagination_temp = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        from_page: meta.from,
        to_page: meta.to,
        total_pages: meta.total,
        path_page: meta.path + "?page=",
        first_link: links.first,
        last_link: links.last,
        prev_link: links.prev,
        next_link: links.next,
      };
      pagination.value = pagination_temp;
    };

    const searchQuery = ref("");

    //watching seach query
    watch(searchQuery, (newX) => {
      //newX is new value of searchQuery
      //we are looking for empty searchQuery value. If it is empty we will fetch units without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getUnits();
      }
    });

    //end of watch
    const searchUnit = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "units/search/" + searchQuery.value;
        units.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              units.push(response.data.data[i]);
            }
            if (response.data.data.length != null) {
              makePagination(response.data.meta, response.data.links);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        //end of api call
      } else {
        //no search query
        console.log("i cannot seach with empy query");
      }
    };

    //here you can return data and methods
    return {
      unit,
      toast,
      units,
      addUnitBtn,
      getUnits,
      showUnitModal,
      displayUnitModal,
      addUnit,
      editUnitModal,
      modalHeader,
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteUnitModal,
      pagination,
      makePagination,
      searchQuery,
      searchUnit,
    };
  }, //end of setup
};
</script>
    
    <style scoped>
/* for modal */
.modal-container {
  background: #000000d6;
  padding: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  min-height: 100%;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  /* padding: 15px; */
  position: relative;
}
.modal-header {
  background: var(--primary);

  padding: 20px;
  color: #fff;
}
.modal-body {
  padding: 20px;
}

.modal-footer {
  background: var(--grey);
  padding: 20px;
  color: #fff;
}
.modal-close-btn-container {
  position: absolute;
  right: -11px;
  color: white;
  top: -12px;
  font-size: 25px;
  cursor: pointer;
}

.modal-tick-btn-container {
  position: absolute;
  right: -30px;
  color: white;
  bottom: -5px;
  font-size: 25px;
  cursor: pointer;
}

.form-input-holder-container {
  margin-bottom: 15px;
}

.unit-header {
  display: flex;
  justify-content: right;
}
.units-content {
  /* background: white; */
}
button.btn-new-unit {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
table {
  background: #fff;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  white-space: nowrap;
}

th,
td {
  text-align: left;
  padding: 16px;
}

th {
  background-color: var(--primary);
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

@media (max-width: 767px) {
  table {
    font-size: 14px;
  }
}

@media (max-width: 479px) {
  table {
    font-size: 12px;
  }
}

/* vue animation */
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.5s ease-in-out;
  /* transition-delay: 0.25s; */
}

.v-enter-from {
  transform: translateY(-500px);
  opacity: 0.001;
}
.v-leave-to {
  transform: translateY(-500px);
  opacity: 0.001;
}
</style>