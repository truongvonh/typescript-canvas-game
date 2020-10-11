var BaseModel = /** @class */ (function () {
    function BaseModel(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
    }
    BaseModel.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return BaseModel;
}());
export default BaseModel;
//# sourceMappingURL=index.js.map