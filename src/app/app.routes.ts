import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ExploreComponent } from './pages/explore.component';
import { StoryDetailComponent } from './pages/story-detail.component';
import { ReaderComponent } from './pages/reader.component';
import { LibraryComponent } from './pages/library.component';
import { ProfileComponent } from './pages/profile.component';
import { PublishComponent } from './pages/publish.component';
import { PrivacyComponent } from './pages/privacy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'story/:id', component: StoryDetailComponent },
  { path: 'story/:id/read/:chapter', component: ReaderComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'publish', component: PublishComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', redirectTo: '' }
];
