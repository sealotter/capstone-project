import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Post from './Post';
import { HighestRated, OwnTopRated, Trending } from './Suggestions';
import FavoriteMedia from './FavoriteMedia';

const Profile = (props) => {
  const {
    auth,
    relationships,
    users,
    match: {
      params: { id },
    },
  } = props;

  const user = users.find((user) => {
    return user.id === id * 1;
  });

  const acceptedFriends =
    user && relationships.length
      ? relationships.filter((rel) => {
          return (
            (rel.senderId === user.id || rel.recipientId === user.id) &&
            rel.status === 'accepted'
          );
        })
      : [];

  const relExists = relationships.find(
    (rel) =>
      (rel.senderId === user?.id && rel.recipientId === auth.id) ||
      (rel.recipientId === user?.id && rel.senderId === auth.id)
  );

  return (
    <>
      {user?.id === auth.id ? (
        <div className="profilePage">
          <div className="center">
            <div className="wallpaper">
              <img
                className="wallpapercontent"
                src={
                  user.wallpaperUrl
                    ? user.wallpaperUrl
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARkAAACzCAMAAACKPpgZAAAAdVBMVEUAAAD////p6elvb2+FhYW6urqUlJQ/Pz/8/Py+vr6NjY12dnb29vaIiIiioqI0NDTa2trh4eHOzs5hYWF5eXns7OxLS0uysrJGRkY8PDyoqKjU1NQtLS1kZGQoKCisrKxTU1MbGxsRERFQUFAXFxcwMDDHx8f7rk6HAAAFDUlEQVR4nO3ba3eiOhQG4GxEDIqRiyjeELXl///E2XsHL60zc1a75igzvs+HFiiwyGsSgqTGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQE+sBoPqvPD+jYNHxpwGg8Mfv67ni4iSoyyMiSZfPXhKFBkTE43+/IU9HQdCS1ngUg6+enCoyQz/3WRI2hOS+USTSc1NMqNxFF77jVlRbPlXUzT8860oJMRdFI1l9UMyTXEy71HUdMfNo2g6k4WqKPjk0Tn1KormurDi7aduuZc4GUs0viQzSyUq38DEgmhtTM37zLRTmpsq0T2y+mMyJaWRbG/lqFB3odhoLzTR/TWnVhat5LEmkr2+XE8fhpNxlmzdJXPkYidpVygVUMa1hCQTsyGSCGiTlxrebTIBJ1xuOMEhVzsufZ5b7dNj3p5s+LR8GpPzr5yXd8Y4+USofGLR/wMns9tLED6ZpX7oq/L6Ye7JruQDlhJb/uMiJceVSJvgx2TkyAUXd2vmAXETmmh14zoT1OaQSUwccM7HJhRIMmSL7e6phf+tsWTAn2IRahgJWdnqi6AKrvUmpYQSKWrXL9SF1oFPdUbay16bpphx1nvfmozGFEvuC7/PuySz/HwxvaLDGL7sTJOpuKXIVv5Ys/MeCdcFIi4mR2ClN54MM2kId8kksneoFcVM20B6FF9npNfeypm5NQZZlpXSnNwlwp7yAzxu/0GXjNaVw00yQ0oGHEtJYaaxSS+Uct9015o0mbnEsUqko1mfk5F7+kGSSbW7J2u57rlLBewpn8xMLpiTOVjfJzZd3RHcsiSSln/SVO9P3EbMT/oZK08XTjblWurVORnpsgppTby8Op/WfWPM/VDdQ0Hkk5FPVep4flvVJTXnb8S13ncXWur7HliaUSCNp9T6E56TkZBjOePY77PJ3dtfk4yUSJLhykL5PqBrY9JCUWNG1o8IuURpEXJzCe6SodZlmgPnOzxFflgkR2cu949nfNhw3uqJ/ppkim7UNbd+HHfz9Mz9c/Km4xiOwdSl/j2Voc3tEyX3MxICBe/+ZJyT3p15PDPU4Z3coE9+lMi3cRkI9LufaZzz30KE3UIdtXn84Zpr57h/MRPnalk97PM2MoVzCzmYxy0D/YP0wGGbOz3kNMzjiZk7d9Dcijhf+q84Dnz2Vs5mdnKCl9Ddm+7EfgzzwpDMr5R+9HyHkzk9+FJ6xu3XP90eLvezB18KAAAAAMD/5n3RLDDAvVMt9UtwSuLi2ZfSL0OidtpUzZwXNv/iLJFvWpX6Pbk3toRq01klSXOzWgeIplPaTx1vRuiJxZIa/lkf/ZpkcrCbX+/+Olb6Rjqy2qK2mZW1sMfzPR5nTUc/n0Tmyjjyr2dLVBpjAn33HfjXuHOS2TeS0HMvqg+2+kbOzIb+3dLYj/SKV39FYGRG1aVL2Y4ut6Sq568cH2FBjV+IZB5NsPQD4FnPp8M8QkU6h+wg8wLylB+cGlkdUfjUq+qDrp/JrK8kOz/sK179hZsI5G4dXaZHHwN/937iFfXFXkIor42nkvFNgPGMJLE2q9u32OnUDHo+T+hBYqpG7mZ9MjFJ+rSr6ZUk+fRdVXqdmvjaKlve/nvKMcXz5Nko8bduNU8QzNWxJTucNIvTYF9Siq+tbp1iPw2U8h7/W8Wz1MVgh+oCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Hp+AFftNrUyXCjpAAAAAElFTkSuQmCC'
                }
              ></img>
            </div>
            <div className="profileInfo">
              <div>
                {
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={auth.avatarUrl}
                  />
                }
              </div>
              <div>{auth.username}</div>
              <div>{auth.bio}</div>
              <div>
                {' '}
                {acceptedFriends.length === 1 ? (
                  <Link to={`/friendsList/${user.id}`}>
                    {acceptedFriends.length} Friend
                  </Link>
                ) : (
                  <Link to={`/friendsList/${user.id}`}>
                    {acceptedFriends.length} Friends
                  </Link>
                )}
              </div>
              <div>
                <Link to="/friendrequests">Friend Requests</Link>
              </div>
            </div>
            <Post id={id} />
          </div>
          <div>
            <FavoriteMedia />
          </div>
        </div>
      ) : (
        <div className="profilePage">
          <div className="center">
            <div>
              <img
                className="wallpapercontent"
                src={
                  user?.wallpaperUrl
                    ? user.wallpaperUrl
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARkAAACzCAMAAACKPpgZAAAAdVBMVEUAAAD////p6elvb2+FhYW6urqUlJQ/Pz/8/Py+vr6NjY12dnb29vaIiIiioqI0NDTa2trh4eHOzs5hYWF5eXns7OxLS0uysrJGRkY8PDyoqKjU1NQtLS1kZGQoKCisrKxTU1MbGxsRERFQUFAXFxcwMDDHx8f7rk6HAAAFDUlEQVR4nO3ba3eiOhQG4GxEDIqRiyjeELXl///E2XsHL60zc1a75igzvs+HFiiwyGsSgqTGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQE+sBoPqvPD+jYNHxpwGg8Mfv67ni4iSoyyMiSZfPXhKFBkTE43+/IU9HQdCS1ngUg6+enCoyQz/3WRI2hOS+USTSc1NMqNxFF77jVlRbPlXUzT8860oJMRdFI1l9UMyTXEy71HUdMfNo2g6k4WqKPjk0Tn1KormurDi7aduuZc4GUs0viQzSyUq38DEgmhtTM37zLRTmpsq0T2y+mMyJaWRbG/lqFB3odhoLzTR/TWnVhat5LEmkr2+XE8fhpNxlmzdJXPkYidpVygVUMa1hCQTsyGSCGiTlxrebTIBJ1xuOMEhVzsufZ5b7dNj3p5s+LR8GpPzr5yXd8Y4+USofGLR/wMns9tLED6ZpX7oq/L6Ye7JruQDlhJb/uMiJceVSJvgx2TkyAUXd2vmAXETmmh14zoT1OaQSUwccM7HJhRIMmSL7e6phf+tsWTAn2IRahgJWdnqi6AKrvUmpYQSKWrXL9SF1oFPdUbay16bpphx1nvfmozGFEvuC7/PuySz/HwxvaLDGL7sTJOpuKXIVv5Ys/MeCdcFIi4mR2ClN54MM2kId8kksneoFcVM20B6FF9npNfeypm5NQZZlpXSnNwlwp7yAzxu/0GXjNaVw00yQ0oGHEtJYaaxSS+Uct9015o0mbnEsUqko1mfk5F7+kGSSbW7J2u57rlLBewpn8xMLpiTOVjfJzZd3RHcsiSSln/SVO9P3EbMT/oZK08XTjblWurVORnpsgppTby8Op/WfWPM/VDdQ0Hkk5FPVep4flvVJTXnb8S13ncXWur7HliaUSCNp9T6E56TkZBjOePY77PJ3dtfk4yUSJLhykL5PqBrY9JCUWNG1o8IuURpEXJzCe6SodZlmgPnOzxFflgkR2cu949nfNhw3uqJ/ppkim7UNbd+HHfz9Mz9c/Km4xiOwdSl/j2Voc3tEyX3MxICBe/+ZJyT3p15PDPU4Z3coE9+lMi3cRkI9LufaZzz30KE3UIdtXn84Zpr57h/MRPnalk97PM2MoVzCzmYxy0D/YP0wGGbOz3kNMzjiZk7d9Dcijhf+q84Dnz2Vs5mdnKCl9Ddm+7EfgzzwpDMr5R+9HyHkzk9+FJ6xu3XP90eLvezB18KAAAAAMD/5n3RLDDAvVMt9UtwSuLi2ZfSL0OidtpUzZwXNv/iLJFvWpX6Pbk3toRq01klSXOzWgeIplPaTx1vRuiJxZIa/lkf/ZpkcrCbX+/+Olb6Rjqy2qK2mZW1sMfzPR5nTUc/n0Tmyjjyr2dLVBpjAn33HfjXuHOS2TeS0HMvqg+2+kbOzIb+3dLYj/SKV39FYGRG1aVL2Y4ut6Sq568cH2FBjV+IZB5NsPQD4FnPp8M8QkU6h+wg8wLylB+cGlkdUfjUq+qDrp/JrK8kOz/sK179hZsI5G4dXaZHHwN/937iFfXFXkIor42nkvFNgPGMJLE2q9u32OnUDHo+T+hBYqpG7mZ9MjFJ+rSr6ZUk+fRdVXqdmvjaKlve/nvKMcXz5Nko8bduNU8QzNWxJTucNIvTYF9Siq+tbp1iPw2U8h7/W8Wz1MVgh+oCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Hp+AFftNrUyXCjpAAAAAElFTkSuQmCC'
                }
              ></img>
            </div>
            <div>
              <Avatar src={user?.avatarUrl} />
            </div>
            <div>{user?.username}</div>
            <Button
              disabled={relExists}
              onClick={() => props.addFriend(auth.id, user.id)}
            >
              {relExists
                ? relExists.status === 'accepted'
                  ? 'Already friends!'
                  : 'Waiting for reply!'
                : 'Add Friend'}
            </Button>
            <div>{user?.bio}</div>
            <div>
              <br />
              {acceptedFriends.length === 1 ? (
                <Link to={`/friendsList/${user?.id}`}>
                  {acceptedFriends.length} Friend
                </Link>
              ) : (
                <Link to={`/friendsList/${user?.id}`}>
                  {acceptedFriends.length} Friends
                </Link>
              )}
            </div>

            <Post id={id} />
          </div>
        </div>
      )}
    </>
  );
};
const mapDispatch = (dispatch) => {
  return {
    addFriend: (senderId, recipientId) => {
      dispatch(addFriend(senderId, recipientId));
    },
  };
};
export default connect((state) => state, mapDispatch)(Profile);
