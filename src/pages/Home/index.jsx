import { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { useEffect, useRef } from "react";
import "./style.css";
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function postUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    window.location.reload()
    getUsers()
  }
  
  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    alert('usuário deletado com sucesso')
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <div className="container">
      <form>
       {/* <marquee behavior="top" direction="top">
          <h1>Cadastro de Usuários</h1>
       </marquee> */}
       <img width={70} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABg1BMVEVM28T///8ySl7/0Fv/cFj5tUxD2sJN4Mj/alA92cEySF3/ZUpM3cb7/v4xQFgyR1z/1FoxQ1r/4t3/saWz7uT/gm/i+fVW3ceU6NnM9O3B8eh849IwPVYmRF4XOFCi697/zMVn4Mzt+/mN5tfm+vbX9vCe6t1Ft6o0VmY2Ym5AnZclQ15JzLk7gIP/z1Py9PXQ1dlZcn9Er6RHwrI+kY84bnZK0r45dXv7skLV5uZAZnNwjZU2ZG80WWhBoptFtKjApVyvn2KXkWZ92a3Z1qdeaXqWn6i2vcT/d2BEWmx0go/g4+WcqrG3wcZOZnX/no+vwsVWeINTXV1jaWB5e2GHg2Dqw10+VmANPF+ikl7Nr11ucV/buV2AfV8eSmOalmispWhXa2dmeWp2jHC41Y3R03vD1IT00WJk2rfg0nAANV3KxnKO2KV3wJzp0Wyk15r/zY7U48b026/h7t7xvVfz6tLkwXHzvWa4z4bq4sLayoqNyMLfxn3/o5X/1tCxzc2LsLKsMmGiAAATrUlEQVR4nNWdi1fbRhaHZTu2kSJZdkMxYEvUxhSDMRAgxOBAHm1ICQ6BJBCSUPpMaDbd9EXT7m530z99ZyTZnpE0kuYhYn7ntKc1lq3P986989IdKRG3NG1kbHx4YrRUqVSKxaIE/gH/VRqdGB4fG9G02L9fivGzq7WxiclKUZblDJCEC74E/lKsTE6M1aox3kVchCPjgC0je8C8AqAZwDk+EtOdxEFYGy5J4LZD2TBO8P7ScC2GuxFNqI2NFqNYjmDN4uiY6JYplLA6XpIobee1pVQaF9osxRFqEI+LrisIKc6SoginJmUxeA6kPDkl6M6EEFaHK5zO6VVGrgwL8VYBhLVRQd7pliyNCgiu3IQjJcbIGUWZTIk7TXISTol3TxejXOFskFyEU6V43BOXXOJi5CCM1T9R8fkqM6E2GrN/YozyKHOCZCTUhs/Jfj3GzDAjIxshCDDnygfFGnJYCLXR87VfVxkmV2UgHDtnB0UQM2PnQFid5HNQFYj9anmSuidHSzhWZDGgqmazWYtMnVtanoP/w4iYKdKakZLwUwYDqll1eWlzc3Naglxqs6zXr80uM1PKn8ZIWGMJoery9XI5B1QuX1sGLjpXVhS9UC5cX1rNMjmsXKHqj9MQjjHcDkSc25wpJ6H0cnM1u5RL2v+TSzZts9KLxlMpCCdYQ4yalZaSBQsrd2N1Q0l2VcjVN5kY5YkYCDWGXrZqRRhLq03bdLquJxEpueQsC6NcipwaoxJWqWMooJPmlmZXms3myub0XHbFRlOSLuV0wEiNmClGTRsRCUdoAQHezeZGOVewlCsXbqzMeOC6jBvT9GbMFCOON6IRjtHzzdZzBQQJhE8SIAw6TRYzRos3kQiHKZugqm4WcmQgHxX0JXozysOiCGkBs3M3yjR4lspNKR7ECIS0WSK7VNDDiTzKzcxRe2qUrBFOSNlRU7OzOQY+ID25TI8Y3oULJaQFVFfKVC0QkVJeigExjJDaRZv0TbAvFsQwRw0hpA4yKzyAIKYyIIaEm2BCasBNPkA2KwYjBhKO0ebBZV3R9QJjpHEQGcJNYOoPIhyh7clIM+XcTHP2Zp2DUKmv0vfggjpwAYTVIuUXqdOz06tgpDDDkg570m/Qp/6gbjiZUKOfkVHBoF1d3SjwAILUv0Ltp5kieTBFJiwxzRmq0jVOQNAUp+n9tERPyDiizza54owlpU4/f0NOiyRC2jDaBeROF1AMfkoOqATCGhMfSBfcLmpJn2OYvCHMwBEIK2yAEl8Y7anQpDeiVKEhZJn4BWIeVrilFBiMSOiE+xIyNkJ1ToyPAhUYWiKhKfoRUqd6R9mmMEKlQJ/2CYnfj3CSbfVMnaObmwlUjr4HDrLiZDRCRh8VaULYd2Mg9PVTL6HGuP6prorjY4w1wIre3puXkHUJO7spKJDaYnJTKTMaTjjFuoStXhOTCx3p11kIpYxnO4ObUGPL9UxOqiiKYUnxiVDKBks0BXnf7aduQtp5iz7hTcoeqWIkHz1+cnDnzpPHj4yGh1Fh6rn5zGm4CFnDDJyDckVSo2EEJY9G4+AwlbeVOrz92MOYu8m2Cu4ONi5C9p0y2Q38Fo0Xtw6eHjUgpgfUaBwlnx3mU33l88+fGvibCrNMDdETbHDCEeadJOqqy0lPDqFxnt9+8ggSAVJb4L+ST1/cPs6jfBZj6kUDJ2TpuEHJIwGEbON6i3AZJ2zcydu2gT54/PzWs4Mvvzw4OLjz7PkxdM6Uj/IvMCsyjS+gXON9jJA5UwDCJSwbKnXX3fflB+foKerPjOlCcmcMjJDdhGDghAWaxu0gEoLyt1A/1W8w7yoqkQinOPZzuTqlJwyAAPERumrMmBCB5CkCIWuytwixHk3jGRvhM8SISp2ZUKr4E7IHUg9h8pQFMJU6PhJiQyycIoQcrRAQ3kAInUDKYMR63031Gfa7QVtin7DGtWsUJVRODtkAU/lv+wmDPdJAxJoPId/GX5TQeMxowlT+ACG8xkM46iWs8vDhhI1bzIR3+qGGPR9aqnoImQcVDuF1pB0y8uGEzH0aS/0hRo+QJ1VI2NDCOGA1IU7I2PN2VHET8mR7i7Dfpzk65rBhvx0yrECh6mX9LiHjDGJP/X6pUmc2IW5DthFwV72ZRYdQ431CRJ3uji04nBQlZFntxiRrGOE4N2FvfHjEHEkxL9Vn+AAleRwjLHECAkTudA8Jv+oR8oVSqBJKyJkMobrpQnnMDggIe16aW+K0YTclSmKctJ8ueJohQsg61YbIcVNJkJP2ZhPZOzSQ8OseYZ3XSbtuahFq/IAg1Nhe2mDPhoDweXf4xN8MgbQeIetqEyZ7Vl+pcwSaVOqwS1hmnC1FZa9ESfzDCkd2Q1QecTgpIDxxBog6+/C3J3uAYREyrvniUpdhr0b5hovw1BkCC3FSqdglrAl55FWV4N0Z3/IRfqOI6JQ6kmsO4bCYZ0Kt6TbjOy7C/GNFSJfNVmbYIeSaoOlLnQZu2viKj9Ce9xbjpPZ0DSQU8WFQ2STzPGKP8AkkVArLIkwIZBPSbpQlKvudIYZQvybEhPbWWklIl83WZyCb8XqpRci2hu8j2HGT+Ae/Xanfg1ZkCGiHSvInQU4Kh8ES9wxNT+pL0OnijaWQsPHVa0GEcLZGYt7j5ZH6OpX6psGX8fMvFDDCTAkjLFYBId9cNyL11Xz+6yO+XtvpUwWuCbwURZipAUIh3W4o9af51GnyKeOijK3DuqKcHM6Laoew8y0lJoRVufhhHgxhj455jHjYSDYO8vM/iLqlzAQgFBVK7YaYOvqahxCMD09O88KaIQymkrBQCvQZNOITvlkMkFDnPxN3S5WEpIkKpZIVa0A45WiI+S+Nk9T8K2EmBMFUk7jngjG9ns/ffs4xX7pxdCv/WuQNyZrEtbbt1cv51FfsNjz8x7diASV5RBKWLGypP77mWJi5bbwRlihsyWPSuOiSSKoVUtkIH68wl+YhKDMuCRrgowIhlVEcG0wIygxL4hJ+T6xGzN8SMjuDKTMhxVCZTP2RzYjz/xQOKGVGJQET+t6PfctEKK4rg6gkCezS9AT74AwmFNiV6asSCyGbEWMxYVyELOE0HhMCPoHdUkTqS1rEeWGjXlzFmAilH6htKGxMiCs2QvV7OiOKG9a7FBMfiDU/0lnw7U+xFdSMh1H+9PMzKsI3P4/GU/Q1Ji/NTCY+b1EsBs+/TP8scDoFVUyERQ0QpqMP9l8et35OiJxtQG4llnwIF9B/aaUj++nbN63Wr4K2E7gVS8a3lu1+a6UjI75Kp1u/R1vItA6nka2ja6LdTCyE1sbH6lk6nY7UFPMA0CYM2wIqy5XR4bGRWq02NT4xWYxUULwSy9jC2kj2Lh0Ncf57+Fv8Ye99CVBGrrgOL6lNqOF+XYphfJixy4yAhhgJ8RUEhM0QiDwcz0iTfnUvpsIcG4wPxY/xncc5RtLpKIgWoO2kAQ+1kGtAhxRPB2N80fM0anbO/mrtL8uI6eCptz8tQMdJE4k535moTGBZ3cA9+JlhwXNtgK951/lm202BFcl58fRP+y2tfznX3G36MIYVnB2RyAyZcaHzpWp2uVk2t5wv1o7t20+fkRBfv3F+hLMuwpZZbi67GGXXY6+fPHx4BX+lWiEiymMC57wB3/VCIWne635x14j+Zpx/++q45TJh4p6ZLBSuY4zu+kgPLw8NDX3xEfaaRgw48oiwdQs1O30tpyvJpLnY+95/9xDP3roZT1+96f6x9a7nhYumVa72Wp/RY8HLl4CGPsZf1UhWlDUxa09qVp2eKdsbTM2d3vfWztLpPiMCefryz+et/t/6cXLHtHcmlm9M29WwPOVKHg5BwkuXXS+TtsgWNSHrh1lp6Ua5+1SQstD/3l8QDOCrh69PT9++ffvmzbsz5A99H00kFrpP5wHGm2rW6sPj+viSTfiR63XCM8wVAWvAwH5LM7n+U0/bCCEcYeA6OztzvdL6N/L+he3e5+i5mSVV9pS5IBH6l1+z1oD5Uj7g26zn0OdHMUKkKRKENEKcEDJu/MfNQSb0bW7WOj5PulCzq5tJvLKQso35VfWvYMTWH9jbtW28AMNCwi0ioS+ItReDfT8N4JutuysnKbt4y6m+C0Js/YH3xrRd9OOMrYRHZEK/iGLtp2HdEwX4VpLeylDKXdf3BlnRZUGgu+gHKl4TBhH6bEG09kSxBVPIV/Ars+62YVBbbP3leS9qQ/2+lyKI0GfwVWHdmwi6n/58nnZo3bYnojqAv3rfirbDft8hIqFnJOjsTaTeXwq718Qy+cq2j2v9duZlbKV/975xASP0gQgk9MwROPtLKfcIO91PovwIEzVPY2y98xvxodlCuUpL6HlAzdkjTLXPW4XHxuiBlef8CBPaL+kWZkCvh1qEyOcYHVpCb0hJ0O7Vh93rckhJL8OXEJgRCTitv37zf9MCUqLGfOC8+NEVRF/YhEP/RV77X/dyV0jp7dWPOsy3hw/BfFjPG5f2izNaap39izSkdXre2AdZw6WeLjlCX7vcHUy5SHrPW0R6ZkbNZm/OhPMFEEJGEHFa6c/JQ3aM0HaGK5cvhWroC/tyV9DsPTMT4bkneNzPRph/upzLT9XP//BvgI4eIISOu38RDgiape2oro5b77mn0GfXAN9mRD5SgLC0sNi5v36/s0hoqUAdtFSU9baFoXA+YMRPrMvxdIE8uxbS+c6qs/Uo/ukQ+nQmoXY6d5OmoSu6YSbvdgiuvIUQUtnwIx8bIs8fhjxDOqvTFCb17WtpD3ZNpECdYpi7D/y89T7yQ9K0Q2dSw9UO+8+QBj4HTFsuUNn23PdCJ2m6fyPFTHa83op1aYJj6WVED51PwmMp8hxwYMeNuvCqp7P1YNvDZzNue4KSiX5OYD688klfveyP5UPsWe6A5/HV1TqFi1p3hptmZ9eXz2bcxdvjAkrI3adBn8cPcNN+wYvIhNiQoEPksxkxjEWUkLdfitVUCHBT+urA/SlhEGHuBwJCxPtIxLmHEnKOLVx1Mcjzwirp3ojS++lC2zVC324gQ+YtLCdRjw8/xZohXtuEOAymd1Iwyu9+48J2OCBA7I+3sFka6jE+lvTc9WmIC8wsJayV7jdejXZt4WrXim6PppunwfK9p8YQabZGpY2kMJ07AbJthr/Zktm2L9hxVa3lmWurdF8NqfVllxGglJPI9qICgiv2rCseuK5Q2OdLfWp9+adET3XgKLJ/+oXogN0cuuVutoa3JUad8/bWa/MdYKjSBrWTgghhJbKrNOW9SZd4w2m0dQu/mnu+c99MTmpPRi3SmNBGwRYtbHnnJqOtPfnWTfSbrmFyUvt2qUxoG9HvR/H4qbN+OOT2Uey+/Wtf+mz1YD1VBfQoKU1o/Sodv+xpuuLp/+w14IcuQHwNmFC/1Jsw3AWeowqk6jbtT6O3scEhGfEKGExddi9yu/yvgvwtsI6wq/xxdCnVkO6ozyVmlXCJGxEMpj4JtCC5jrCnJWbp070t/Sr9hQqx5Zr3yRM7UGuqzzSpP6FrLVydYz6eiqX5kq8xkn598K46pmuPUUA9b5cRmZ1UuBSyGRd3TdcZA0E12V3hNCvofCoRMnRfxsWroMG76vUE1tXHOjbwRMoPDYbIMO/ewyC1nU7ShLeIV/4OPhsBO99C2AlcoqSY5u5WZ3EH6kHn/rbZzZ859MnMkPMt0CGG4INjhEgxDNM0rX+Qm0PdNOyMEuScGXUu4DT0wRJavj30nJl+xhB8ulGs6pd3Cz8rqB9ssgPopCT1zjOJct5TN9h4jlUZZCl11T/M+BI6swEXyUnhOckWYrRz15yZxYvkpF03jXp2nrUPTF29MJEUyi5ZG/n8Q+in2aWL5KQg6QM3jX6GJTyH9GI5qeWmNOeQguG+0MMMz0H6TKbij0I6D/iCOSksl0l3HrBn+nngZb4nkBDP5d66WIjm3yQQ8tnq+4MywI+iXJvIQSbU6hcnmhbWyRutyISJNe/BhQMqfYP0dGIwYWIxygruAEg5WQugCCJM7FHP634QmUGAwYQXA5GYJ6IQhuyGGQg568eshADxQxMESyEnwoiEib8HGjEcMJxwsBHDASMQAsSBbYsRAKMQDm64CQsykQkHNGkoIWmChjDx/mTw+qh6YE+GljCxNnDd8MJGNMCohImFjcEaTBXWAzrbTIQJbX+QsobZDi6VwUI4SCE1Qp5nIky8Z9qAIF6FeqQgykCYWFsfADMqZuQmSE+Y0LY+OKJO46H0hMBT6x82phobNB7KQpiotj+gGRWzTeWhTISgD3fyocxonNAakI0wobXNDxFUdSN6EuQkTCQW188//ZvrEbtpQggTWufkXFdQFeNkj8WA7ISgo9o2z41R0c128AbMOAhB/j+v5ggaIJuD8hICxv1zYNTNfQ4+TkIQcuJmLJj7Qbtn4yeEdjSMuNqjYnD5pyBC2B6TsRhSN5P8fEII4bPa68IZdXPd51lvBgkhTFiBVSCkbpoizGdJFCEw5N6+GG8F3rm/R93BJkocIdDO3v4JXz9AKZgn+3vk6igMEkqYgJZs12H1C4YnSmDFjHp7T0jjQySaEGoN+KsBbBmdUgG2M4Bvimp7qOIgBNLW9tpX63C/ecgTDYoOLGfWr7b31hh71mGKidDSws5ep71ehxvrDYgKjApxwb8VCGZtu6+vtzt7O6I9E1WchJY0bWHt/d69Tnt/fX2jXgeE9frG+vp+u3Nv7/3aghaT5fr6P5CYvr9ZrNQFAAAAAElFTkSuQmCC" alt="" />
          <h1>Cadastro de Usuários</h1>
        <input name="nome" type="text" placeholder="Digite seu nome..." ref={inputName}/>
        <input name="idade" type="number" placeholder="Digite sua idade..." ref={inputAge}/>
        <input name="email" type="email" placeholder="Digite seu email..." ref={inputEmail}/>
        <button type="button" onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <FaTrash color="#8b8ae1" size={20}/>
          </button>
        </div>
      ))}

    </div>
  );
}

export default Home;
