/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fontAwesomeSolidIcons } from './icons.font-awesome-solid';
import { fontAwesomeBrandsIcons } from './icons.font-awesome-brands';
import {fontAwesomeRegularIcons} from "./icons.font-awesome-regular";

@NgModule({
    exports: [FontAwesomeModule],
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(
            fontAwesomeSolidIcons,
            fontAwesomeBrandsIcons,
            fontAwesomeRegularIcons
        );
    }
}
