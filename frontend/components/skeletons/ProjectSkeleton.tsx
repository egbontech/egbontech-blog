import React from "react";
import Skeleton from "react-loading-skeleton";

interface ProjectProps {
  number: number;
}

const ProjectSkeleton: React.FC<ProjectProps> = ({ number }) => {
  return Array(number)
    .fill(0)
    .map((item, index) => (
      <div className="card"key={index}>
        <div className="image">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="details">
          <p className="title">
            {" "}
            <Skeleton height="100%" width="200px" />
          </p>
          <p className="body">
            <Skeleton height="100%" width="80%" />
          </p>
          <p className="body">
            <Skeleton height="100%" width="40%" />
          </p>
        </div>
      </div>
    ));
};

export default ProjectSkeleton;
