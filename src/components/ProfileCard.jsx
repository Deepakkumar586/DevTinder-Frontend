import React from "react";

const ProfileCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, gender, age, skills } = user;

  return (
    <div className="bg-base-300 w-full max-w-md rounded-lg shadow-lg   mb-12 max-h-[900px] overflow-hidden">
      {/* Profile Image Section */}
      <div className="relative">
        <img
          className="h-56 w-full "
          src={photoUrl || "https://via.placeholder.com/150"}
          alt="user"
        />
        {/* Overlay for Age and Gender */}
        {gender && age && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-gray-200 px-3 py-1 text-sm rounded-md">
            <span className="font-semibold">{gender}</span> |{" "}
            <span>Age: {age}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 overflow-auto">
        {/* User Name */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {firstName} {lastName}
        </h2>

        {/* About Section */}
        <p className="text-gray-400 text-sm mb-4">
          {about || "This user hasn't provided any details yet."}
        </p>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              Skills:
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-lg truncate text-center"
                  title={skill} // Tooltip for full skill name
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-1">
          <button className="w-1/2 btn btn-secondary text-white font-medium py-2 rounded-lg mr-2 transition duration-200">
            Ignore
          </button>
          <button className="w-1/2 bg-indigo-700 btn btn-primary text-white font-medium py-2 rounded-lg ml-2 transition duration-200">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
