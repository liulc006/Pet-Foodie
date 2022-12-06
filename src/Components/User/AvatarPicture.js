import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../../store';

const AvatarPicture = () => {
  const { auth } = useSelector((state) => state);
  const [el, setEl] = useState(null);
  const [data, setData] = useState(
    auth.avatar
      ? auth.avatar
      : require('../../../static/img/avatar-placeholder.png')
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (el) {
      el.addEventListener('change', (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          setData(reader.result);
        });
      });
    }
  }, [el]);

  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ avatar: data }));
    el.value = '';
    //setData('');
  };

  return (
    <div>
      <img
        style={{
          resizeMode: 'center',
          height: '200px',
          width: '200px',
          marginLeft: '50px',
          borderRadius: '50%',
        }}
        src={data}
      />
      <form onSubmit={save}>
        <input type="file" ref={(x) => setEl(x)} />
        <button disabled={!data}>Upload Avatar</button>
      </form>
    </div>
  );
};

export default AvatarPicture;
