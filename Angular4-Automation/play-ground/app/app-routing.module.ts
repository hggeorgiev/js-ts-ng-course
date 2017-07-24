import { NgModule }                 from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { FailComponent } from "./fail/fail.component"
import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";

let routes: Routes = [
  { path: 'contacts',   loadChildren: 'app/contacts/contacts.module#ContactsModule' },
  { path: 'about',      loadChildren: 'app/about/about.module#AboutModule', data: { preload: true } },
  { path: '',           redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**',         component: FailComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(
                routes, 
                { 
                  useHash: true,
                  preloadingStrategy: SelectivePreloadingStrategy  
                }) 
           ],
  exports: [ RouterModule ],
  providers: [ SelectivePreloadingStrategy ]
})
export class AppRoutingModule {}