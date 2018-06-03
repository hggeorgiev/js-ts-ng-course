import { NgModule }                 from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'

import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";
import { NotFoundComponent } from "./not-found/not-found.component";

let routes: Routes = [
    { path: 'contacts',   loadChildren: 'src/app/contacts/contacts.module#ContactsModule' },
    { path: 'about',      loadChildren: 'src/app/about/about.module#AboutModule', data: { preload: true } },
    { path: '',           redirectTo: '/contacts', pathMatch: 'full' },
    { path: '**',         component: NotFoundComponent}
];

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