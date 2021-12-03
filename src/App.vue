<template>
  <v-app>
    <v-container style="width: 400px"
    >
      <h2>Инвестировать сейчас</h2>
      <v-divider class="mb-5"></v-divider>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="onSubmit">
          <v-row class="d-flex justify-start align-center px-5">
            <v-col
                cols="6"
                align="start"
                class="pa-1">
              Сумма инвестиции
            </v-col>
            <v-col
                cols="6"
                class="pa-1"
            >
              <ValidationProvider name="amount_investment" rules="required|Investment_amount" v-slot="{ errors }">
                <div class="span_wrapper" v-if="errors[0]">
                  <span>{{ errors[0] }}</span>
                </div>
                <my-input
                    id="amount_investment"
                    name="amount_investment"
                    icon="mdi-currency-usd"
                    maxlength="6"
                    v-model="form.sumInv"
                    type="string"
                />
              </Validationprovider>
            </v-col>
          </v-row>


          <v-row class="d-flex justify-start align-center mb-5 px-5">
            <v-col
                cols="6"
                align="start"
                class="pa-1">
              Мультипликатор
            </v-col>
            <v-col
                cols="2"
                class="justify-start pa-1">
              <ValidationProvider name="cartoonist" rules="required|Cartoonist" v-slot="{ errors }">
                <div class="span_wrapper" style="top: 30px" v-if="errors[0]">
                  <span>{{ errors[0] }}</span>
                </div>
                <my-input icon="mdi-close"
                          name="cartoonist"
                          maxlength="2"
                          v-model="form.mult"
                          type="string"
                          @focusInput="focusInput"
                />
              </ValidationProvider>
              <div class="slider-wrapper" v-if="focusMult">
                <input class="slider" type="range" v-model="form.mult" max="40" min="1" @blur="focusMult=false"/>
                <datalist>
                  <option value="1" label="1"></option>
                  <option value="5" label="5"></option>
                  <option value="20" label="20"></option>
                  <option value="40" label="40"></option>
                </datalist>
              </div>
            </v-col>
            <v-col cols="4"
                   class="pa-1"
            >
              {{ `= $ ${form.sumInv * form.mult}` }}
            </v-col>
          </v-row>


          <v-expansion-panels class="mb-5">
            <v-expansion-panel>
              <v-expansion-panel-header

              >
                Ограничить прибыль и убытки
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="d-flex justify-start align-center">
                  <v-col
                      cols="6"
                      align="start"
                      class="pa-1">
                    Ограничение в
                  </v-col>

                  <v-col
                      cols="6"
                      class="pa-1"
                  >
                    <v-radio-group
                        row
                        value='mdi-currency-usd'
                        @change="$store.commit('setLimitation', $event)"
                    >
                      <v-radio
                          label="%"
                          value="mdi-percent-outline"
                      ></v-radio>
                      <v-radio
                          id="radio"
                          label="$"
                          value="mdi-currency-usd"
                      ></v-radio>
                    </v-radio-group>

                  </v-col>
                </v-row>
                <v-row class="d-flex justify-start align-center">
                  <v-col
                      class="d-flex justify-start pa-1"
                      cols="6"
                  >
                    <v-checkbox
                        label="Прибыль"
                        @change="$store.commit('setProfit', $event)"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                      cols="6"
                      class="pa-1">
                    <ValidationProvider name="Profit" rules="Value_profit_lesion" v-slot="{ errors }">
                      <div class="span_wrapper" v-if="errors[0]" style="top: 90px">
                        <span>{{ errors[0] }}</span>
                      </div>
                      <my-input
                          name="Profit"
                          :disabled="!($store.getters.getProfit)"
                          type="number"
                          v-model="form.takeProfit"
                          :icon="$store.getters.getLimitation"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>


                <v-row class="d-flex justify-start align-center">
                  <v-col
                      class="d-flex justify-start pa-1"
                      cols="6"
                  >
                    <v-checkbox
                        label="Убыток"
                        @change="$store.commit('setLesion', $event)"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                      cols="6"
                      class="pa-1">
                    <ValidationProvider name="Lesion" rules="Value_profit_lesion|Value_lesion_max" v-slot="{ errors }">
                      <div class="span_wrapper" v-if="errors[0]" style="top:170px">
                        <span>{{ errors[0] }}</span>
                      </div>
                      <my-input
                          name="Lesion"
                          :disabled="!($store.getters.getLesion)"
                          type="number"
                          v-model="form.stopLoss"
                          :icon="$store.getters.getLimitation"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>


          <v-row class="d-flex align-center">
            <v-col
                cols="6"
            >
              <v-btn
                  color='error'
                  width=100%
                  type="submit"
                  :disabled="invalid"
                  @click="btn='reduction'"
              >
                <v-icon
                    dark
                    left
                    small
                >
                  mdi-arrow-down
                </v-icon>
                В снижение
              </v-btn>
            </v-col>
            <v-col
                cols="6">
              <v-btn
                  color="success"
                  width=100%
                  type="submit"
                  :disabled="invalid"
                  @click="btn='growth'"
              >
                <v-icon
                    dark
                    left
                    small
                >mdi-arrow-up
                </v-icon>
                В рост
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </v-app>
</template>

<script>



import MyInput from "@/components/UI/MyInput";
import {extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import axios from "axios";


export default {
  name: 'PostFormAxios',
  components: {MyInput},
  data() {
    return {
      focusMult: false,
      btn:'',
      form: {
        sumInv: "5000",
        mult: "40",
        takeProfit: "",
        stopLoss: "",
        direction: "",
      }
    }
  },
  watch: {
    'form.sumInv': function (newValue) {
      this.form.takeProfit = String(Math.ceil(newValue / 100 * 30))
      this.form.stopLoss = String(Math.ceil(newValue / 100 * 30))
    }
  },
  methods: {
    onSubmit() {
      if(!(this.$store.getters.getLesion)){
        delete this.form.stopLoss
      }
      if(!(this.$store.getters.getProfit)){
        delete this.form.takeProfit
      }
      this.form.direction=this.btn
      axios.post('https://httpbin.org/post', this.form)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            alert(error);
          }).finally(() => {

      });
    },
    focusInput(focus) {
      this.focusMult = focus
    }
  }
}

extend('required', {
  ...required,
  message: 'Это поле обязательно к заполнению'
});

extend('Investment_amount', value => {
  if (value >= 100) {
    return true;
  }
  return 'Минимальная сумма инвестиции $ 100';
});

extend('Cartoonist', value => {
  if (40 >= value >= 1) {
    return true;
  }

  return 'Неверное значение мультипликатора';
});
extend('Value_lesion_max', value => {
  if (document.getElementById('radio').checked === true) {
    let profit = document.getElementById('amount_investment').value
    if (value < Number(profit)) {
      return true;
    }
    return `Не может быть больше ${profit}`;
  } else {
    if (value < 100) {
      return true;
    }
    return 'Не может быть больше 100%';
  }


});

extend('Value_profit_lesion', value => {
  if (document.getElementById('radio').checked === true) {
    let profit = document.getElementById('amount_investment').value
    profit = profit / 100 * 10
    if (value >= profit) {
      return true;
    }
    return `Не может быть меньше ${profit}`;
  } else {
    if (value >= 10) {
      return true;
    }
    return 'Не может быть меньше 10%';
  }
});


</script>

<style>
.slider-wrapper {
  margin-top: 10px;
  position: absolute;
  right: 50%;
  margin-right: -180px;
  z-index: 10;
  border-radius: 2px;
  background-color: #3f3f3f;
  padding: 20px 30px 10px 30px;
}

.slider {
  width: 300px;
}

datalist {
  display: grid;
  grid-template-columns: 11% 35% 48% 5%;
  color: #bdbebd;
}

.span_wrapper {
  font-size: 14px;
  width: 180px;
  position: absolute;
  top: 5px;
  background: #F44336;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  z-index: 999;
}


</style>

