import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MagicProxyDestinationComponent } from './components/magic-proxy-destination/magic-proxy-destination.component';
import { MagicProxyEntryComponent } from './components/magic-proxy-entry/magic-proxy-entry.component';
import { MagicPreferenceComponent } from './components/magic-preference/magic-preference.component';
import { MagicSecurityComponent } from './components/magic-security/magic-security.component';
import { MagicSectionComponent } from './components/magic-section/magic-section.component';
import { MagicHeaderComponent } from './components/magic-header/magic-header.component';
import { MagicFooterComponent } from './components/magic-footer/magic-footer.component';
import { MagicWidgetComponent } from './components/magic-widget/magic-widget.component';
import { MagicLoginComponent } from './components/magic-login/magic-login.component';
import { MagicProxyComponent } from './components/magic-proxy/magic-proxy.component';
import { MagicUsersComponent } from './components/magic-users/magic-users.component';
import { MagicPanelComponent } from './pages/magic-panel/magic-panel.component';
import { MagicAuthComponent } from './pages/magic-auth/magic-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    MagicAuthComponent,
    MagicLoginComponent,
    MagicPanelComponent,
    MagicProxyComponent,
    MagicUsersComponent,
    MagicHeaderComponent,
    MagicFooterComponent,
    MagicWidgetComponent,
    MagicSectionComponent,
    MagicSecurityComponent,
    MagicPreferenceComponent,
    MagicProxyEntryComponent,
    MagicProxyDestinationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    OverlayPanelModule,
    InputSwitchModule,
    InputTextModule,
    TooltipModule,
    RippleModule,
    ButtonModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
