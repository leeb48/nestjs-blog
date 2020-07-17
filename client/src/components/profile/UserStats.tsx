import React, { Fragment } from 'react';

interface UserStatsProps {
  // TODO:
  // Number of posts
  // Number of liked posts
  dateRegistered: string | null;
}

const UserStats = ({ dateRegistered }: UserStatsProps) => {
  return (
    <Fragment>
      <section className="info-tiles">
        <div className="tile is-ancestor has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">10</p>
              <p className="subtitle"># of posts</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">42</p>
              <p className="subtitle"># of liked posts</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">{dateRegistered}</p>
              <p className="subtitle">Member since</p>
            </article>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserStats;
