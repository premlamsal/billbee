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
            <div class="form-input-unit">
              <label>Unit Short Name</label>
              <input
                type="text"
                placeholder="Unit Short Name"
                class="unitShortNameHolder"
                v-model="unit.short_name"
              />
            </div>
            <div class="form-input-unit">
              <label> Long Name</label>

              <input
                type="text"
                placeholder="Unit Long Name"
                class="unitLongNameHolder"
                v-model="unit.long_name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="unit-header">
      <button class="btn-new-unit" @click="addUnitBtn()">
        <span class="btn-name"> New Unit</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="units-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
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
                    >delete</span
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </main>

</template>
    <script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import ModalDialog from "@/components/ModalDialog.vue";
import { createConfirmDialog } from "vuejs-confirm-dialog";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const units = reactive([]);
    const showUnitModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const unit = reactive({});
    const modalHeader = ref(""); // Add or Edit Unit

    const { reveal, onConfirm, onCancel } = createConfirmDialog(ModalDialog);

    //on mounted start
    onMounted(() => {
      getUnits();
    reveal();//modal function to show modal

    });

    //end of onMounted

    //modal
    onConfirm(() => {
      console.log("Confirmed!");
    });
    onCancel(() => {
      console.log("Canceled!");
    });

    //modal

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
      if (showUnitModal.value) {
        showUnitModal.value = false;
      } else {
        showUnitModal.value = true;
      }
    };
    const clearUnit = () => {
      unit.short_name = "";
      unit.long_name = "";
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
            console.log(error);
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
            console.log(error);
          });
      }
    };

    const getUnits = () => {
      // toast("Unit Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      units.length = 0;
      axios
        .get("units")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            units.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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

input.unitShortNameHolder,
input.unitLongNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

.form-input-unit {
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