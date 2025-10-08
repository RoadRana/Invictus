import './Profile.css';
import Banner from '../shared/Banner';
import banner from '../assets/banner photo1.png';

const Profile = () => {
  const username = localStorage.getItem('username') || 'User';
  const email = localStorage.getItem('email') || 'user@example.com';

  const heading = `Welcome ${username} to your profile`;
  const subheading = '';

  return (
    <div className=" mt-20">
      <Banner banner={banner} heading={heading} subsheading={subheading} />

      <div className="profile-container">
        <div className="profile-card">
          <img
            src="/path/to/profile-photo.jpg"
            alt="Profile Photo"
            className="profile-photo"
          />
          <div className="profile-info">
            <h2>{username}</h2>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {/* Add more profile details as needed */}
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-posts">
            <h3>Posts</h3>
            {/* List of user's posts */}
            <div className="post">Post 1</div>
            <div className="post">Post 2</div>
            <div className="post">Post 3</div>
          </div>
          <div className="profile-services">
            <h3>Services</h3>
            {/* List of services */}
            <div className="service">Service 1</div>
            <div className="service">Service 2</div>
            <div className="service">Service 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
