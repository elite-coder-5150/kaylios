import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';


import { HeaderComponent } from './header/header.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { OtpCheckEmailComponent } from './otp-check-email/otp-check-email.component';
import { FooterComponent } from './footer/footer.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { NotesTableComponent } from './notes/notes-table/notes-table.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioItemComponent } from './portfolio/portfolio-item/portfolio-item.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HomeComponent } from './home/home.component';
@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        RegisterComponent,
        LoginComponent,
        UserListComponent,
        EditUserComponent,
        ForgotPasswordComponent,
        HeaderComponent,
        CheckEmailComponent,
        OtpCheckEmailComponent,
        FooterComponent,
        ContactMeComponent,
        NotesComponent,
        AddNoteComponent,
        EditNoteComponent,
        NotesTableComponent,
        AddNoteComponent,
        PortfolioComponent,
        PortfolioItemComponent,
        CustomCheckboxComponent,
        NewsletterComponent,
        SearchComponent,
        SearchResultsComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
