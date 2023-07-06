import ContentLayout from '../components/layout/ContentLayout';
import MyProfile from '../components/profile/MyProfile';

export default function ProfilePage() {
  return (
    <ContentLayout page="내 프로필">
      <MyProfile />
    </ContentLayout>
  );
}
