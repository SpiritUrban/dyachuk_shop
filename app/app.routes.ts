import { provideRouter, RouterConfig } from '@angular/router';

import { test }                        from './components/test/test.component';


// Connect pages
import { main_page }     from './components/main_page/main_page.component'        ;
import { channel }       from './components/channel/channel.component'            ;
import { featuredvideo } from './components/featuredvideo/featuredvideo.component';
import { modelpage }     from './components/modelpage/modelpage.component'        ;
import { singlevideo }   from './components/singlevideo/singlevideo.component'    ;
import { stories }       from './components/stories/stories.component'            ;
import { top100vote }    from './components/top100vote/top100vote.component'      ;
import { verified }      from './components/verified/verified.component'          ;

import { model_reg1 }    from './components/_model_reg/model_reg1/model_reg1.component';
import { model_reg2 }    from './components/_model_reg/model_reg2/model_reg2.component';
import { model_reg3 }    from './components/_model_reg/model_reg3/model_reg3.component';
import { model_reg4 }    from './components/_model_reg/model_reg4/model_reg4.component';
import { model_reg5 }    from './components/_model_reg/model_reg5/model_reg5.component';
import { model_reg6 }    from './components/_model_reg/model_reg6/model_reg6.component';

import { confirmation_email }    from './components/_model_reg/confirmation_email/confirmation_email.component';
import { authorization }         from './components/authorization/authorization.component';

import { client_reg1 }    from './components/_client_reg/client_reg1/client_reg1.component';
import { client_reg2 }    from './components/_client_reg/client_reg2/client_reg2.component';
import { client_reg3 }    from './components/_client_reg/client_reg3/client_reg3.component';
import { client_reg4 }    from './components/_client_reg/client_reg4/client_reg4.component';
import { client_reg_15min }      from './components/_client_reg/client_reg_15min/client_reg_15min.component';

import { payment }         from './components/payment/payment/payment.component';
import { transaction }   from './components/payment/transaction/transaction.component'    ;
// import { z__model_registation_steps }    from './components/_model_reg/z__model_registation_steps/z__model_registation_steps.component';

// Pathees for pages
const routes: RouterConfig = [
  { path: '',              component: main_page     },
  { path: 'channel',       component: channel       },
  { path: 'featuredvideo', component: featuredvideo },
  { path: 'modelpage',     component: modelpage     },
  { path: 'singlevideo',   component: singlevideo   },
  { path: 'stories',       component: stories       },
  { path: 'top100vote',    component: top100vote    },  
  { path: 'verified',      component: verified      },

  { path: 'model_reg1',    component: model_reg1 },
  { path: 'model_reg2',    component: model_reg2 },
  { path: 'model_reg3',    component: model_reg3 },
  { path: 'model_reg4',    component: model_reg4 },
  { path: 'model_reg5',    component: model_reg5 },
  { path: 'model_reg6',    component: model_reg6 },

  { path: 'confirmation_email',   component: confirmation_email },
  { path: 'authorization',        component: authorization      },

  { path: 'client_reg1',    component: client_reg1 },
  { path: 'client_reg2',    component: client_reg2 },
  { path: 'client_reg3',    component: client_reg3 },
  { path: 'client_reg4',    component: client_reg4 },
  { path: 'client_reg_15min',    component: client_reg_15min    },

  { path: 'payment',       component: payment       },
  { path: 'transaction',   component: transaction   },

  { path: 'test',           component: test        }
  
];


export const appRouterProviders = [
  provideRouter(routes)
];


// channel  modelpage  top100vote   transaction