import { ArrowUpRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../Components/Input';
import { api } from '../services/api';
import getRandomColor from '../utils/backColors';

function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(term.toLowerCase()) ||
          user.nickname?.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <section className="height p-12 mt-4 text-white">
      <div className="flex justify-center w-full p-2 relative h-full rounded-2xl">
        <div className="flex items-center flex-col gap-4 h-full ">
          <div className="flex items-center gap-1 justify-center absolute top-0">
            <Input
              placeholder={'Buscar usuários...'}
              icon={<Search className="w-5 h-5" />}
              className={'w-[320px] md:w-[700px] '}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="relative top-25 flex items-center text-white cursor-pointer"
            >
              <div
                className="flex flex-col items-start p-2 bg-[#111827] rounded-xl md:w-[500px] w-[300px]"
                onClick={() =>
                  navigate(`/buscar/usuario/${user._id}`, {
                    state: { user: user },
                  })
                }
              >
                <div className="flex gap-2 items-center relative">
                  <div className={`md:w-12 w-8 md:h-12 h-8 font-bold rounded-full ${getRandomColor()} flex justify-center items-center`}>
                    <p>{user.name?.charAt(0) || ''}</p>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="md:text-[16px] font-bold text-[14px] text-white bg-clip-text">
                      {user.name}
                    </h2>
                    <span className="text-gray-400 md:text-[12px] text-[10px]">
                      {`@${user.nickname}`}
                    </span>
                  </div>
                </div>
                <div className="absolute right-4 top-5 text-gray-300">
                  <ArrowUpRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchUsers;
