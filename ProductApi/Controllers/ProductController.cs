using Microsoft.AspNetCore.Mvc;
using ProductApi.Models;
using ProductApi.Services;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get() =>
            await _productService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(string id)
        {
            var product = await _productService.GetByIdAsync(id);

            if (product == null) return NotFound();

            return product;

        }

        [HttpPost]
        public async Task<ActionResult> Post(Product product)
        {
            await _productService.CreateAsync(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, Product product)
        {
            var existing = await _productService.GetByIdAsync(id);

            if (existing == null) return NotFound();

            product.Id = existing.Id;
            await _productService.UpdateAsync(id, product);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(String id)
        {
            var product = await _productService.GetByIdAsync(id);

            if (product == null) return NotFound();

            await _productService.DeleteAsync(id);
            return NoContent();
        }
    }
}