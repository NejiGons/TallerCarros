using System;

namespace TallerCarros.Models
{
    public class ProcessModel
    {
        public int IdProceso { get; set; }
        public int IdUsuario { get; set; }
        public int IdVehiculo { get; set; }
        public string Descripcion { get; set; }
        public decimal PrecioReparacion { get; set; }
        public DateTime DiaIngreso { get; set; }
        public DateTime DiaRetiro { get; set; }
        public string EstadoProceso { get; set; }
    }
}
