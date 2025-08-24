import { useState, useEffect } from "react";
import Banner from "../shared/Banner";
import { FaLinkedin } from "react-icons/fa";
import banner from "../assets/banner photo.png";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const heading = "About Our Company";
  const subheading =
    "We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.";

  // API configuration
  const baseUrl = "";
  const token =
    "";
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${baseUrl}/users/api/list_team_members/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is an array or an object containing the array
        let membersArray = [];
        if (Array.isArray(data)) {
          membersArray = data;
        } else if (Array.isArray(data.results)) {
          membersArray = data.results;
        } else if (typeof data === "object" && data !== null) {
          membersArray = Object.values(data);
        }
        console.log("Fetched members array:", membersArray);

        const teamMembersData = membersArray.map((member) => ({
          id: member.id,
          name: member.name,
          profile_image: member.profile_image,
          social_linkedin: member.social_linkedin,
          short_intro: member.short_intro,
        }));

        setTeamMembers(teamMembersData);
          console.log("Fetched team members:", teamMembersData);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Function to generate profile image URL
  const getProfileImage = (profile) => {
    if (
      profile.profile_image &&
      !profile.profile_image.includes("user-default.png")
    ) {
      return `${baseUrl}${profile.profile_image}`;
    }
    // Fallback to random image if no profile image is set
    return `https://picsum.photos/seed/${profile.id}/200/200`;
  };

  // Function to get LinkedIn URL
  const getLinkedInUrl = (profile) => {
    if (profile.social_linkedin) {
      return profile.social_linkedin.startsWith("http")
        ? profile.social_linkedin
        : `https://${profile.social_linkedin}`;
    }
    return "#"; // Return empty link if no LinkedIn URL
  };

  return (
    <div className="mt-20">
      <Banner banner={banner} heading={heading} subsheading={subheading} />

      <div className="container mx-auto py-12 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Who We Are
        </h2>
        <p className="text-lg text-justify text-gray-600 mb-4 leading-relaxed">
          In the heart of Alexandria, Egypt, a dream was born among a group of
          keen engineering students in 2017. With a passion for innovation and a
          desire to apply our learning in meaningful ways, we embarked on a
          journey to create an underwater Remotely Operated Vehicle (ROV) that
          would challenge the conventions of marine exploration and research.
          Our fresh perspective led us to design an ROV that earned design
          accolades at the MATE International ROV Competition. This early
          success was a testament to our team's ingenuity and determination,
          sparking a flame that would illuminate our path forward. Our thirst
          for knowledge and excellence propelled us to further our education,
          with team members completing master's degrees in renowned universities
          across the globe. Armed with advanced knowledge in engineering fields
          critical to our mission, we officially founded Invictus UMVs at the
          dawn of 2023. Today, Invictus UMVs is at the forefront of unmanned
          marine robotics in Egypt, specializing in the development of
          industrial-grade Autonomous Surface Vehicles (ASVs) and ROVs. Our
          commitment to innovation remains alive in our vehicles' intelligent
          autonomous behavior, achieved through the integration of advanced
          control algorithms and cutting-edge Artificial Intelligence/Machine
          Learning technologies. Looking ahead, our vision is to expand our
          autonomous fleet by introducing an Autonomous Underwater Vehicle (AUV)
          and an Unmanned Aerial Vehicle (UAV). Our goal is to establish
          seamless communication among our diverse vehicles, enabling the
          creation of multi-vehicle swarms/fleets that can undertake complex,
          coordinated missions across different domains. From our humble
          beginnings as aspiring engineers to becoming pioneers in the field of
          unmanned marine robotics in Egypt, our journey is one of passion,
          perseverance, and unwavering dedication to pushing the boundaries of
          what is possible. At Invictus UMVs, we are not just building vehicles;
          we are shaping the future of marine exploration and beyond. In our
          quest to pioneer advancements in unmanned marine robotics, we are
          deeply committed to protecting the environment that harbors the
          mysteries we seek to understand. At Invictus UMVs, sustainability is
          at the core of our innovation. We power our fleet with green
          electrical energy, ensuring that our vehicles not only push the
          boundaries of exploration but do so with minimal impact on our
          planet's delicate ecosystems. Our dedication to minimizing our carbon
          footprint is unwavering, as we believe that the future of exploration
          and technology should harmoniously coexist with the preservation of
          the natural world.
        </p>
        <p className="text-lg text-justify text-gray-600 mb-4 leading-relaxed">
          As we expand our fleet to include Autonomous Underwater and Aerial
          Vehicles (AUVs and UAVs), our vision is to enable multi-vehicle swarms
          for complex missions. At Invictus UMVs, we are committed to
          sustainability, powering our vehicles with green energy to minimize
          environmental impact while maximizing exploration.
        </p>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center">
            <h3 className="text-xl font-semibold text-primary mb-4">
              We Understand Requirements
            </h3>
            <p className="text-gray-600 mb-6">
              We focus on understanding your requirements to deliver the best
              output.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center">
            <h3 className="text-xl font-semibold text-primary mb-4">
              We Work Precisely
            </h3>
            <p className="text-gray-600 mb-6">
              Precision is our strength. We deliver accurate and efficient
              solutions.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center">
            <h3 className="text-xl font-semibold text-primary mb-4">
              We Deliver the Best Output
            </h3>
            <p className="text-gray-600 mb-6">
              We ensure the best output for our clients with optimized
              solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Meet Us Section */}
      <div className="container mx-auto py-12 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Meet Us
        </h2>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading team members...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && teamMembers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No team members found.</p>
          </div>
        )}

        {!loading && !error && teamMembers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center"
              >
                <img
                  src={getProfileImage(member)}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {member.short_intro || "Team Member"}
                </p>
                {member.social_linkedin && (
                  <a
                    href={getLinkedInUrl(member)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 inline-flex items-center"
                  >
                    <FaLinkedin className="mr-2" /> Connect on LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
