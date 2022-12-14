using backend.Business.Generic;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : Controller
    {
        private IBusiness<Categoria> _categoriaBusiness;

        public CategoriaController(IBusiness<Categoria> categoriaBusiness)
        {
            _categoriaBusiness = categoriaBusiness;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoriaBusiness.FindAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Categoria _categoria = _categoriaBusiness.FindById(id);

            if (_categoria == null)
                return NotFound();

            return Ok(_categoria);
        }

        [HttpGet("byTipoCategoria/{idUsuario}/{idTipoCategoria}")]
        public IActionResult GetByTipoCategoria([FromRoute] int idUsuario, [FromRoute] int idTipoCategoria)
        {
            var _categoria = _categoriaBusiness.FindAll()
                .FindAll(prop => prop.IdTipoCategoria.Equals(idTipoCategoria) &&
                                (prop.IdUsuario.Equals(idUsuario) ||
                                 prop.IdUsuario == null ||
                                 prop.IdUsuario.Equals(0)));

            if (_categoria == null)
                return NotFound();

            return Ok(_categoria);
        }

        [HttpPost]
        //[Authorize("Bearer")]
        public IActionResult Post([FromBody] Categoria categoria)
        {
            if (categoria == null)
                return BadRequest();

            try
            {
                return new ObjectResult(new { message = true, receita = _categoriaBusiness.Create(categoria) });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar o cadastro de uma nova categoria, tente mais tarde ou entre em contato com o suporte." });
            }
        }

        [HttpPut]
        //[Authorize("Bearer")]
        public IActionResult Put([FromBody] Categoria categoria)
        {
            if (categoria == null)
                return BadRequest();

            Categoria updateCategoria = _categoriaBusiness.Update(categoria);
            if (updateCategoria == null)
                return NoContent();

            return new ObjectResult(updateCategoria);
        }

        [HttpDelete("{id}")]
        //[Authorize("Bearer")]
        public IActionResult Delete(int id)
        {
            _categoriaBusiness.Delete(id);
            return NoContent();
        }
    }
}
