import Banner from '../shared/Banner';
import { FaLinkedin } from 'react-icons/fa'; // LinkedIn icon
import banner from '../assets/banner photo.png'; // Make sure the path is correct

const About = () => {
    const heading = 'About Our Company';
    const subheading = 'We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.';

    const teamMembers = [
        {
            name: 'John Doe',
            title: 'CEO & Founder',
            linkedin: 'https://www.linkedin.com/in/johndoe',
        },
        {
            name: 'Jane Smith',
            title: 'CTO',
            linkedin: 'https://www.linkedin.com/in/janesmith',
        },
        {
            name: 'Bob Johnson',
            title: 'Lead Engineer',
            linkedin: 'https://www.linkedin.com/in/bobjohnson',
        },
        {
            name: 'Alice Williams',
            title: 'AI Specialist',
            linkedin: 'https://www.linkedin.com/in/alicewilliams',
        },
        {
            name: 'Michael Brown',
            title: 'Operations Manager',
            linkedin: 'https://www.linkedin.com/in/michaelbrown',
        },
        {
            name: 'Laura Garcia',
            title: 'Business Development',
            linkedin: 'https://www.linkedin.com/in/lauragarcia',
        },
    ];

    // Function to generate random placeholder images
    const generateRandomImage = (id) => `https://picsum.photos/seed/${id}/200/200`;

    return (
        <div className="mt-20">
            <Banner banner={banner} heading={heading} subsheading={subheading} />

            <div className="container mx-auto py-12 px-4 md:px-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    In the heart of Alexandria, Egypt, a dream was born among a group of keen engineering students in 2017. With a passion for innovation and a desire to apply our learning in meaningful ways, we embarked on a journey to create an underwater Remotely Operated Vehicle (ROV) that would challenge the conventions of marine exploration and research.

                    Our fresh perspective led us to design an ROV that earned design accolades at the MATE International ROV Competition. This early success was a testament to our team’s ingenuity and determination, sparking a flame that would illuminate our path forward.

                    Our thirst for knowledge and excellence propelled us to further our education, with team members completing master’s degrees in renowned universities across the globe. Armed with advanced knowledge in engineering fields critical to our mission, we officially founded Invictus UMVs at the dawn of 2023.

                    Today, Invictus UMVs is at the forefront of unmanned marine robotics in Egypt, specializing in the development of industrial-grade Autonomous Surface Vehicles (ASVs) and ROVs. Our commitment to innovation remains alive in our vehicles’ intelligent autonomous behavior, achieved through the integration of advanced control algorithms and cutting-edge Artificial Intelligence/Machine Learning technologies.

                    Looking ahead, our vision is to expand our autonomous fleet by introducing an Autonomous Underwater Vehicle (AUV) and an Unmanned Aerial Vehicle (UAV). Our goal is to establish seamless communication among our diverse vehicles, enabling the creation of multi-vehicle swarms/fleets that can undertake complex, coordinated missions across different domains.

                    From our humble beginnings as aspiring engineers to becoming pioneers in the field of unmanned marine robotics in Egypt, our journey is one of passion, perseverance, and unwavering dedication to pushing the boundaries of what is possible. At Invictus UMVs, we are not just building vehicles; we are shaping the future of marine exploration and beyond.

                    In our quest to pioneer advancements in unmanned marine robotics, we are deeply committed to protecting the environment that harbors the mysteries we seek to understand. At Invictus UMVs, sustainability is at the core of our innovation. We power our fleet with green electrical energy, ensuring that our vehicles not only push the boundaries of exploration but do so with minimal impact on our planet’s delicate ecosystems. Our dedication to minimizing our carbon footprint is unwavering, as we believe that the future of exploration and technology should harmoniously coexist with the preservation of the natural world.

                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    As we expand our fleet to include Autonomous Underwater and Aerial Vehicles (AUVs and UAVs), our vision is to enable multi-vehicle swarms for complex missions. At Invictus UMVs, we are committed to sustainability, powering our vehicles with green energy to minimize environmental impact while maximizing exploration.
                </p>
            </div>

            <div className="container mx-auto py-12 px-4 md:px-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">We Understand Requirements</h3>
                        <p className="text-gray-600 mb-6">
                            We focus on understanding your requirements to deliver the best output.
                        </p>
                        <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors">
                            Learn More
                        </button>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">We Work Precisely</h3>
                        <p className="text-gray-600 mb-6">
                            Precision is our strength. We deliver accurate and efficient solutions.
                        </p>
                        <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors">
                            Learn More
                        </button>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">We Deliver the Best Output</h3>
                        <p className="text-gray-600 mb-6">
                            We ensure the best output for our clients with optimized solutions.
                        </p>
                        <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Meet Us Section */}
            <div className="container mx-auto py-12 px-4 md:px-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Meet Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl text-center"
                        >
                            <img
                                src={generateRandomImage(index)}
                                alt={member.name}
                                className="w-32 h-32 full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                            <p className="text-gray-600 mb-4">{member.title}</p>
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-800"
                            >
                                <FaLinkedin className="inline-block mr-2" /> Connect on LinkedIn
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
