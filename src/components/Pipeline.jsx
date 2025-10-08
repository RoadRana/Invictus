import { useState } from 'react';

const PipelineInspection = () => {
  const [visibleSection, setVisibleSection] = useState('pipelineinspection');

  const handleLinkClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          'Pipeline Inspection',
          'Cable Inspection',
          'Hull Inspection',
          'Dam Inspection',
          'Seabed Inspection',
        ].map((item, index) => (
          <div
            key={index}
            className="group relative p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() =>
              handleLinkClick(item.replace(/ /g, '').toLowerCase())
            }
          >
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl font-medium ${visibleSection === item.replace(/ /g, '').toLowerCase() ? 'text-blue-600' : 'text-gray-800'} group-hover:text-blue-600`}
              >
                {item}
              </h3>
            </div>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-600 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {visibleSection === 'pipelineinspection' && (
          <div
            id="pipelineinspection"
            className="details-section p-6 bg-white shadow-lg rounded-lg"
          >
            <h3 className="text-3xl font-bold text-blue-600 mb-6">
              Ensure Pipeline Safety & Efficiency with Advanced Inspections
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Protect your infrastructure and peace of mind alongside the
              environment with our comprehensive pipeline sustainable inspection
              services. We utilize state-of-the-art Inspection Class Remotely
              Operated Vehicles and Autonomous Surface Vehicles to assess the
              health and condition of your pipelines without ecological
              disruption, identifying potential risks before they become costly
              problems. This advanced technology offers a safe, efficient, and
              eco-friendly approach to pipeline maintenance.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 mb-5">
              Our Approach
            </h3>
            <ol className="list-decimal list-inside text-gray-700 text-lg mb-6 leading-relaxed">
              {/* List items */}
              <li className="mb-4">
                <span className="font-semibold">
                  Pre-Inspection Planning & Collaboration:
                </span>
                <ul className="list-disc list-inside pl-6 mt-2">
                  <li>
                    Client Needs Assessment: Engage in detailed discussions to
                    understand project-specific inspection goals and
                    infrastructure details.
                  </li>
                  <li>
                    Comprehensive Data Gathering: Collect key data on
                    infrastructure such as pipeline length, diameter, and
                    material, alongside environmental conditions, ensuring a
                    thorough understanding of the inspection context.
                  </li>
                  <li>
                    Advanced Mapping for Custom Plans: Utilize cutting-edge
                    mapping software to develop a tailored inspection strategy,
                    emphasizing the deployment of the most suitable technology.
                  </li>
                  <li>
                    ROV Deployment for Detailed Inspection: Opt for Inspection
                    Class ROVs for close-range, detailed scrutiny of pipeline
                    integrity, highlighted by high-definition visual and
                    sensor-based examinations.
                  </li>
                  <li>
                    ASV Utilization for Shallow-Water Surveys: Deploy the
                    MaatSeer ASV for high-resolution surveys in shallow waters,
                    leveraging its advanced navigation and sensory capabilities
                    for broad area coverage.
                  </li>
                  <li>
                    Integrated ROV and ASV Solutions: For extensive inspections
                    necessitating both detailed and wide-range assessments,
                    combine ROV and ASV strengths to deliver comprehensive
                    insights.
                  </li>
                  <li>
                    Tailored Solution Design: Craft customized solutions
                    aligning with specific client requirements, ensuring an
                    efficient, safe, and precise inspection process.
                  </li>
                </ul>
              </li>
              {/* Continue with other list items */}
              {/* ... */}
            </ol>

            <div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-5">
                Why Invictus UMVs
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-lg mb-6 leading-relaxed">
                <li className="mb-3">
                  Faster Operations: Our UMVs drastically cut downtime, quickly
                  resuming essential services.
                </li>
                <li className="mb-3">
                  Detailed Insights: Superior diagnostics pinpoint issues early
                  with high-definition precision.
                </li>
                <li className="mb-3">
                  Cost-Effective: Save on operational costs with our efficient
                  unmanned solutions.
                </li>
                <li className="mb-3">
                  Safer Inspections: Eliminate human risk in hazardous
                  conditions with our advanced UMVs.
                </li>
                <li className="mb-3">
                  Eco-Friendly: Our electric-powered vehicles minimize
                  environmental impact and reduces carbon footprint.
                </li>
                <li className="mb-3">
                  Greater Access: Easily inspect hard-to-reach areas without
                  extensive setup.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-5">
                Case Study
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Discover how Invictus UMVs can enhance your infrastructure’s
                reliability and safety—contact us today.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineInspection;
