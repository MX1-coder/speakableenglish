const About = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 pr-25 pl-5">
            <h2 className="font-merriweather text-3xl mb-6 font-bold ml-2">
              Start your journey to a better life with online practical courses
            </h2>
            <div className="mb-6 flex items-center">
              <img
                src="/users.png"
                alt="Trainers Icon"
                className="w-7 h-7 mr-3 ml-8"
              />
              <div>
                <h2 className="text-xl font-bold ml-2">Professional Trainers</h2>
                <p className="ml-2">
                  Our team of experienced teachers is passionate about guiding you through the journey of
                  effective communication.
                </p>
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <img
                src="/diploma.png"
                alt="Certifications Icon"
                className="w-7 h-7 mr-3 ml-8"
              />
              <div>
                <h2 className="text-xl font-bold ml-2">International Certifications</h2>
                <p className="ml-2">
                  Whether you are a beginner or looking to refine your speaking abilities, our tailored
                  programs cater to all levels. Join us and build confidence in your English proficiency.
                </p>
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <img
                src="/stats.png"
                alt="Free Months Icon"
                className="w-7 h-7 mr-3 ml-8"
              />
              <div>
                <h2 className="text-xl font-bold ml-2">Free for 3 months</h2>
                <p className="ml-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 h-96 rounded-full overflow-hidden relative">
            <div className="h-full bg-gray-300 rounded-full p-6 w-96">
              <form className="mx-auto text-center">
                <h2 className="mt-6">Sign Up Today</h2>
                <div className="mb-4 mt-8">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-60 px-2 py-2 border border-gray-300 rounded-md"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-60 px-2 py-2 border border-gray-300 rounded-md"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="pass"
                    name="password"
                    required
                    className="w-60 px-2 py-2 border border-gray-300 rounded-md"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-white transition mx-auto mt-5">
                  Get Started
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  