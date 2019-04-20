
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import store from './store.js'
import fbApp from '../main.js';
import {format} from 'date-fns'


export default {
  getData() {
        return new Promise((resolve,reject)=>{
            fbApp.database().ref('/').once('value').then((res)=>{
                let retrieved_data = res.val().map((item)=>{
                    return {
                        ID: item.ID,
                        Name: item.Name,
                        Description: item.Description,
                        Amount: item.Amount,
                        Date:  format(item.Date,'ddd MM, YYYY'),
                        }
                    });
                store.commit('SET_CSV_DATA',retrieved_data);
                resolve(retrieved_data);
              }).catch(err=>{
                console.log('err : ',err);
                reject(err);
              })
        })
    }
  }