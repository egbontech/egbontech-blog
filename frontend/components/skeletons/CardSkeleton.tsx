import React from "react";
import Skeleton from "react-loading-skeleton";

interface CardProps {
  number: number;
}

const CardSkeleton: React.FC<CardProps> = ({ number }) => {
  return Array(number)
    .fill(0)
    .map((item, index) => (
      <div className="card" key={index}>
        <div className="image">
          <Skeleton height="100%" width="100%" />
        </div>
        <div style={{ margin: "10px 8px" }}>
              
          <p> <Skeleton height="100%" width="80px" /></p>      
           
          
        </div>

        <div className="title">
          <p>
            <Skeleton height="100%" width="200px" />
          </p>
        </div>

        <div className="author-date">
          <div className="item">
            <p>
              <Skeleton height="100%" width="60px" />
            </p>
          </div>
          <div className="item">
            <p>
              <Skeleton height="100%" width="60px" />
            </p>
          </div>
        </div>
        <div className="statistics"></div>
      </div>
    ));
};

export default CardSkeleton;
