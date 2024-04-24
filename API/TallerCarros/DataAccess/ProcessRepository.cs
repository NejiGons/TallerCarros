using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TallerCarros.Models;

namespace TallerCarros.DataAccess
{
    public class ProcessRepository
    {
        private readonly DbContextTaller _dbContext;

        public ProcessRepository(DbContextTaller dbContext)
        {
            _dbContext = dbContext;
        }

        public ProcessModel GetProcessById(int id)
        {
            return _dbContext.Procesos.FirstOrDefault(p => p.IdProceso == id);
        }

        public List<ProcessModel> GetAllProcesses()
        {
            return _dbContext.Procesos.ToList();
        }

        public void AddProcess(ProcessModel process)
        {
            _dbContext.Procesos.Add(process);
            _dbContext.SaveChanges();
        }

        public void UpdateProcess(ProcessModel process)
        {
            _dbContext.Entry(process).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public void DeleteProcess(int id)
        {
            var processToDelete = _dbContext.Procesos.Find(id);
            if (processToDelete != null)
            {
                _dbContext.Procesos.Remove(processToDelete);
                _dbContext.SaveChanges();
            }
        }
    }
}
