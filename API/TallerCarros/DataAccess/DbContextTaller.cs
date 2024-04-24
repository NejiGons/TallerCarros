using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web;
using TallerCarros.Models;

namespace TallerCarros.DataAccess
{
    public class DbContextTaller : DbContext
    {
        public DbSet<carModel> Vehiculos { get; set; }
        public DbSet<userModel> Usuarios { get; set; }
        public DbSet<ProcessModel> Procesos { get; set; }
        public DbContextTaller() : base("name=CarDbContext")
        {
        }
    }
}