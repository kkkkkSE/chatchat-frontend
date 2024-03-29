import ContentLayout from '../components/layout/ContentLayout';
import MyProfile from '../components/profile/MyProfile';

export default function ProfilePage() {
  return (
    <ContentLayout
      pageHeader="내 프로필"
      testId="my-profile"
    >
      <MyProfile />
    </ContentLayout>
  );
}
