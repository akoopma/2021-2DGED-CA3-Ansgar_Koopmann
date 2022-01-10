// This Class uses Code from https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/ contributed by avanitrachhadiya2155  

class DiagonalCollision {

    static CheckForCollision(spriteA, spriteB) {

        let boundingBoxA = new Rect(
            spriteA.transform.boundingBox.x + spriteA.body.velocityX,
            spriteA.transform.boundingBox.y + spriteA.body.velocityY,
            spriteA.transform.boundingBox.width,
            spriteA.transform.boundingBox.height
        );

        let spriteBStart = spriteB.transform.translation;
        let spriteBLength = spriteB.transform.dimensions.x * spriteB.transform.scale.x;
        let spriteBAngle = spriteB.transform.rotationInRadians;
        let spriteBVector = new Vector2(spriteBLength * Math.cos(spriteBAngle), spriteBLength * Math.sin(spriteBAngle));
        let spriteBEnd = Vector2.Add(spriteBStart, spriteBVector);
        
        let leftBoundingLimit = boundingBoxA.center.x - boundingBoxA.width/2;
        let rightBoundingLimit = boundingBoxA.center.x + boundingBoxA.width/2;
        let upperBoundingLimit = boundingBoxA.center.y - boundingBoxA.height/2;
        let lowerBoundingLimit = boundingBoxA.center.y + boundingBoxA.height/2;

        let spriteALowerBoundingLineStart = new Vector2(leftBoundingLimit, lowerBoundingLimit);
        let spriteALowerBoundingLineEnd = new Vector2(rightBoundingLimit, lowerBoundingLimit);

        return doIntersect(spriteALowerBoundingLineStart, spriteALowerBoundingLineEnd, spriteBStart, spriteBEnd);


        // Given three collinear points p, q, r, the function checks if
        // point q lies on line segment 'pr'
        function onSegment(p, q, r)
        {
            if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
            return true;
        
            return false;
        }

        // To find orientation of ordered triplet (p, q, r).
        // The function returns following values
        // 0 --> p, q and r are collinear
        // 1 --> Clockwise
        // 2 --> Counterclockwise
        function orientation(p, q, r)
        {

            // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
            // for details of below formula.
            let val = (q.y - p.y) * (r.x - q.x) -
                    (q.x - p.x) * (r.y - q.y);
        
            if (val == 0) return 0; // collinear
        
            return (val > 0)? 1: 2; // clock or counterclock wise
        }

        // The main function that returns true if line segment 'p1q1'
        // and 'p2q2' intersect.
        function doIntersect(p1, q1, p2, q2)
        {

            // Find the four orientations needed for general and
            // special cases
            let o1 = orientation(p1, q1, p2);
            let o2 = orientation(p1, q1, q2);
            let o3 = orientation(p2, q2, p1);
            let o4 = orientation(p2, q2, q1);
        
            // General case
            if (o1 != o2 && o3 != o4)
                return true;
        
            // Special Cases
            // p1, q1 and p2 are collinear and p2 lies on segment p1q1
            if (o1 == 0 && onSegment(p1, p2, q1)) return true;
        
            // p1, q1 and q2 are collinear and q2 lies on segment p1q1
            if (o2 == 0 && onSegment(p1, q2, q1)) return true;
        
            // p2, q2 and p1 are collinear and p1 lies on segment p2q2
            if (o3 == 0 && onSegment(p2, p1, q2)) return true;
        
            // p2, q2 and q1 are collinear and q1 lies on segment p2q2
            if (o4 == 0 && onSegment(p2, q1, q2)) return true;
        
            return false; // Doesn't fall in any of the above cases
        }
    }
}