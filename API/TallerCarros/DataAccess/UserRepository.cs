using System.Collections.Generic;
using System.Linq;
using TallerCarros.Models;

namespace TallerCarros.DataAccess
{
    public class UserRepository
    {
        private readonly DbContextTaller _dbContext;

        public UserRepository(DbContextTaller dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<userModel> GetAllUsers()
        {
            return _dbContext.Usuarios.ToList();
        }

        public userModel GetUserById(int userId)
        {
            return _dbContext.Usuarios.FirstOrDefault(u => u.Id == userId);
        }

        public void AddUser(userModel user)
        {
            _dbContext.Usuarios.Add(user);
            _dbContext.SaveChanges();
        }

        public void UpdateUser(userModel user)
        {
            var existingUser = _dbContext.Usuarios.FirstOrDefault(u => u.Id == user.Id);
            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.identification = user.identification;
                existingUser.Email = user.Email;
                existingUser.Age = user.Age;
                existingUser.PhoneNumber = user.PhoneNumber;
                existingUser.Address = user.Address;
                _dbContext.SaveChanges();
            }
        }

        public void DeleteUser(int userId)
        {
            var userToDelete = _dbContext.Usuarios.FirstOrDefault(u => u.Id == userId);
            if (userToDelete != null)
            {
                _dbContext.Usuarios.Remove(userToDelete);
                _dbContext.SaveChanges();
            }
        }
    }
}
