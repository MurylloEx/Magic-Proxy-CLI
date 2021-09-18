import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MagicAuthComponent } from './pages/magic-auth/magic-auth.component';
import { MagicPanelComponent } from './pages/magic-panel/magic-panel.component';
import { MagicLoginComponent } from './components/magic-login/magic-login.component';
import { MagicProxyComponent } from './components/magic-proxy/magic-proxy.component';
import { MagicUsersComponent } from './components/magic-users/magic-users.component';
import { MagicHeaderComponent } from './components/magic-header/magic-header.component';
import { MagicFooterComponent } from './components/magic-footer/magic-footer.component';
import { MagicWidgetComponent } from './components/magic-widget/magic-widget.component';
import { MagicSectionComponent } from './components/magic-section/magic-section.component';
import { MagicSecurityComponent } from './components/magic-security/magic-security.component';
import { MagicUserEntryComponent } from './components/magic-user-entry/magic-user-entry.component';
import { MagicPreferenceComponent } from './components/magic-preference/magic-preference.component';
import { MagicProxyEntryComponent } from './components/magic-proxy-entry/magic-proxy-entry.component';
import { MagicProxyDestinationComponent } from './components/magic-proxy-destination/magic-proxy-destination.component';
import { HttpClientModule } from '@angular/common/http';

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
    MagicUserEntryComponent,
    MagicPreferenceComponent,
    MagicProxyEntryComponent,
    MagicProxyDestinationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    InputTextareaModule,
    ToggleButtonModule,
    OverlayPanelModule,
    InputSwitchModule,
    HttpClientModule,
    AppRoutingModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    MessageModule,
    BrowserModule,
    RippleModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    CardModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
