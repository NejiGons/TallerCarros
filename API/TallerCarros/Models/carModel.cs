using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TallerCarros.Models
{
    public class carModel
    {
        public int ID { get; set; }
        public string Matricula { get; set; }
        public string Modelo { get; set; }
        public int OwnerId { get; set; }
    }
}