const registerBtn = document.querySelector('.registerBtn');
const findAllBtn = document.querySelector('.findAllBtn');
const findUserBtn = document.querySelector('.findUserBtn');

// 유저 등록
registerBtn.addEventListener('click', () => {
  const name = document.getElementById('nameText').value;
  const email = document.getElementById('emailText').value;
  const password = document.getElementById('passwordText').value;

  axios({
    method: 'post',
    url: '/user/create',
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
});

// 유저 전체 조회
findAllBtn.addEventListener('click', () => {
  const allUserBox = document.querySelector('.allUserBox');

  axios.get('/user/all').then((response) => {
    const allUserData = response.data.users[0];

    allUserData.forEach((user) => {
      const newUserBox = document.createElement('div');
      newUserBox.innerHTML = `
          <table>
           <tr>
              <td>유저 아이디</td>
              <td>${user.id}</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>${user.email}</td>
            </tr>
            <tr>
              <td>유저 이름</td>
              <td>${user.name}</td>
            </tr> 
          </table>
          <br />
          <hr />
          <br />
        `;
      allUserBox.appendChild(newUserBox);
    });
  });
});

// 특정 유저 조회(이메일 사용)
findUserBtn.addEventListener('click', () => {
  const email = document.getElementById('findEmailValue').value;

  axios({
    method: 'post',
    url: '/user/find',
    data: {
      email: email,
    },
  }).then((response) => {
    const userBox = document.querySelector('.userBox');
    const user = response.data.user[0];
    if (!user) {
      alert('사용자가 없습니다.');
    }
    userBox.innerHTML = `
      <table>
        <tr>
          <td>유저 아이디</td>
          <td>${user.id}</td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>${user.email}</td>
        </tr>
        <tr>
          <td>유저 이름</td>
          <td>${user.name}</td>
        </tr>
      </table>
    `;
  });
});
