import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import fbApp from '../main.js';
import {format} from 'date-fns'
import { resolve } from 'path';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    getters: {
    },
    actions:{
        async getData({commit}){
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
                    commit('SET_CSV_DATA',retrieved_data);
                    resolve(retrieved_data);
                  }).catch(err=>{
                    console.log('err : ',err);
                  })
            })
        },
        updateEntries({commit,dispatch},payload){
            let entries_to_update = payload;
            entries_to_update.forEach((entry) => {
                console.log('test :', format(entry.Date,'DD/MM/YYYY'));
                    fbApp.database().ref('/').orderByChild('ID')
                            .equalTo(`${entry.ID}`)
                            .once('value',(snapshot)=>{
                                snapshot.forEach((child)=>{
                                    child.ref.update({
                                        Name:entry.Name,
                                        Description:entry.Description,
                                        Amount:entry.Amount,
                                        Date: new Date(format(entry.Date,'dd,MM,YYYY')),
                                    }).then((res)=>{
                                        dispatch('getData');
                                        commit('SET_SUBMIT_ACTION',true)
                                    });
                                });
                            })
            });
        }
    }
})