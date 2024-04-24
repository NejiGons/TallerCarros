using System;
using System.Collections.Generic;
using System.Linq;
using TallerCarros.Models;

namespace TallerCarros.DataAccess
{
    public class CarRepository
    {
        private readonly DbContextTaller _dbContext;

        public CarRepository(DbContextTaller dbContext)
        {
            _dbContext = dbContext;
        }

        // Método para obtener todos los carros
        public IEnumerable<carModel> GetAllCars()
        {
            return _dbContext.Vehiculos.ToList();
        }

        // Método para obtener un carro por su ID
        public carModel GetCarById(int id)
        {
            return _dbContext.Vehiculos.FirstOrDefault(c => c.ID == id);
        }

        // Método para agregar un nuevo carro
        public void AddCar(carModel car)
        {
            _dbContext.Vehiculos.Add(car);
            _dbContext.SaveChanges();
        }

        // Método para actualizar un carro existente
        public void UpdateCar(carModel car)
        {
            var existingCar = _dbContext.Vehiculos.FirstOrDefault(c => c.ID == car.ID);
            if (existingCar != null)
            {
                existingCar.Matricula = car.Matricula;
                existingCar.Modelo = car.Modelo;
                // Actualizar otros campos según sea necesario
                _dbContext.SaveChanges();
            }
        }

        // Método para eliminar un carro
        public void DeleteCar(int id)
        {
            var carToDelete = _dbContext.Vehiculos.FirstOrDefault(c => c.ID == id);
            if (carToDelete != null)
            {
                _dbContext.Vehiculos.Remove(carToDelete);
                _dbContext.SaveChanges();
            }
        }
    }
}
