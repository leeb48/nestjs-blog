import React from 'react';

const RecentPost = () => {
  return (
    <div className="column is-6">
      <div className="card event-card">
        <header className="card-header">
          <p className="card-header-title">My recent posts</p>
        </header>
        <div className="card-table">
          <div className="content">
            <table className="table is-fullwidth is-striped">
              <tbody>
                {/* TODO: PostListItem Component */}

                <tr>
                  <td width="5%">
                    <i className="fas fa-feather-alt"></i>
                  </td>
                  <td>
                    <a href="">My post</a>
                  </td>
                  <td className="level-right">
                    <a
                      href="#"
                      className="button is-small is-warning post-button profile-post-btn"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="button is-small is-danger profile-post-btn"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="5%">
                    <i className="fas fa-feather-alt"></i>
                  </td>
                  <td>
                    <a href="">My post</a>
                  </td>
                  <td className="level-right">
                    <a
                      href="#"
                      className="button is-small is-warning post-button profile-post-btn"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="button is-small is-danger profile-post-btn"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="5%">
                    <i className="fas fa-feather-alt"></i>
                  </td>
                  <td>
                    <a href="">My post</a>
                  </td>
                  <td className="level-right">
                    <a
                      href="#"
                      className="button is-small is-warning post-button profile-post-btn"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="button is-small is-danger profile-post-btn"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="5%">
                    <i className="fas fa-feather-alt"></i>
                  </td>
                  <td>
                    <a href="">My post</a>
                  </td>
                  <td className="level-right">
                    <a
                      href="#"
                      className="button is-small is-warning post-button profile-post-btn"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="button is-small is-danger profile-post-btn"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="5%">
                    <i className="fas fa-feather-alt"></i>
                  </td>
                  <td>
                    <a href="">My post</a>
                  </td>
                  <td className="level-right">
                    <a
                      href="#"
                      className="button is-small is-warning post-button profile-post-btn"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="button is-small is-danger profile-post-btn"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
